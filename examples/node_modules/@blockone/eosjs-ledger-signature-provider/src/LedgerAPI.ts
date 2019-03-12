import bippath from 'bip32-path'
import Buff from 'buffer/'

import {
  convertSignatures,
  GET_LEDGER_PATHS,
  iteratePromises,
  LEDGER_CODES,
  serialize,
} from './LedgerUtils'

export interface LedgerAPIInterface {
  transport: any
  addressIndex: number
  scrambleKey: string
}

/**
 * Ledger API
 * @param transport Ledger transport method
 */
export class LedgerAPI implements LedgerAPIInterface {
  public transport: any = null
  public addressIndex: number = 0
  public scrambleKey: string = 'e0s'

  constructor(transport: any) {
    this.transport = transport

    try {
      transport.decorateAppAPIMethods(
        this,
        ['getPublicKey', 'signTransaction', 'getAppConfiguration'],
        this.scrambleKey
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * @returns [keys] An array of public keys
   */
  public getPublicKey(requestPermission: boolean = true): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const path = GET_LEDGER_PATHS(this.addressIndex)
        const paths = bippath.fromString(path).toPathArray()
        const buffer = Buff.Buffer.alloc(1 + paths.length * 4)
        buffer[0] = paths.length
        paths.forEach((element: number, index: number) => {
          buffer.writeUInt32BE(element, 1 + 4 * index)
        })

        return this.transport
          .send(
            LEDGER_CODES.CLA,
            LEDGER_CODES.INS_GET_PUBLIC_KEY,
            requestPermission ? LEDGER_CODES.P1_CONFIRM : LEDGER_CODES.P1_NON_CONFIRM,
            LEDGER_CODES.P1_NON_CONFIRM,
            buffer
          )
          .then((response: any) => {
            const publicKeyLength = response[0]
            const addressLength = response[1 + publicKeyLength]

            resolve(response
              .slice(
                1 + publicKeyLength + 1,
                1 + publicKeyLength + 1 + addressLength
              )
              .toString('ascii'))
          }).catch((err: Error) => {
            reject(err)
          })
      }, 1)
    })
  }

  /**
   * @returns A Signed eos transaction
   */
  public async signTransaction(
    { chainId, serializedTransaction }: { chainId: string, serializedTransaction: Uint8Array }
    ) {
    const path = GET_LEDGER_PATHS(this.addressIndex)
    const paths = bippath.fromString(path).toPathArray()
    let offset = 0
    let transactionBuffer

    try {
      transactionBuffer = serialize(chainId, serializedTransaction).toString('hex')
    } catch (error) {
      console.error(error)
      throw new Error('Unable to deserialize transaction')
    }

    const rawTx = Buff.Buffer.from(transactionBuffer, 'hex')
    const toSend = []
    let response: any
    while (offset !== rawTx.length) {
      const maxChunkSize = offset === 0 ? 150 - 1 - paths.length * 4 : 150
      const chunkSize =
        offset + maxChunkSize > rawTx.length
          ? rawTx.length - offset
          : maxChunkSize
      const buffer = Buff.Buffer.alloc(
        offset === 0 ? 1 + paths.length * 4 + chunkSize : chunkSize
      )
      if (offset === 0) {
        buffer[0] = paths.length
        paths.forEach((element: number, index: number) => {
          buffer.writeUInt32BE(element, 1 + 4 * index)
        })
        rawTx.copy(buffer, 1 + 4 * paths.length, offset, offset + chunkSize)
      } else {
        rawTx.copy(buffer, 0, offset, offset + chunkSize)
      }
      toSend.push(buffer)
      offset += chunkSize
    }

    return iteratePromises(toSend, (data: any[], i: number) =>
      this.transport
        .send(
          LEDGER_CODES.CLA,
          LEDGER_CODES.INS_SIGN,
          i === 0 ? LEDGER_CODES.P1_FIRST : LEDGER_CODES.P1_MORE,
          LEDGER_CODES.P1_NON_CONFIRM,
          data,
         )
        .then((apduResponse: any) => {
          response = apduResponse
          return response
        })
      ).then(() => {
        const v = response.slice(0, 1).toString('hex')
        const r = response.slice(1, 1 + 32).toString('hex')
        const s = response.slice(1 + 32, 1 + 32 + 32).toString('hex')
        return convertSignatures(v + r + s)
      }).catch((error) => {
        console.error(error)
        throw error
      })
  }
}
