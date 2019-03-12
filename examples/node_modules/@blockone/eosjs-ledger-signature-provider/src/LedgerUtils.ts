import Transport from '@ledgerhq/hw-transport-u2f'
import { Api, JsonRpc, Serialize } from 'eosjs'
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig'

import ecc from 'eosjs-ecc'

import asn1 from 'asn1-ber'
import Buff from 'buffer/'

declare const TextDecoder: any
declare const TextEncoder: any

export enum LEDGER_CODES {
  CLA = 0xD4,
  INS_GET_PUBLIC_KEY = 0x02,
  INS_SIGN = 0x04,
  INS_GET_APP_CONFIGURATION = 0x06,
  P1_CONFIRM = 0x01,
  P1_NON_CONFIRM = 0x00,
  P1_FIRST = 0x00,
  P1_MORE = 0x80,
}

export const GET_LEDGER_PATHS =  (index = 0) => `44'/194'/0'/0/${index}`

let cachedTransport: any
export async function getTransport() {
  if (cachedTransport) {
    return cachedTransport
  }
  cachedTransport = await Transport.create()
  return cachedTransport
}

export const getAppConfiguration = () => (
  this.transport.send(
    LEDGER_CODES.CLA,
    LEDGER_CODES.INS_GET_APP_CONFIGURATION,
    LEDGER_CODES.P1_NON_CONFIRM,
    LEDGER_CODES.P1_NON_CONFIRM,
  )
  .then(() => true)
  .catch((err: any) => { throw Error(err) })
)

export const convertSignatures = (sigs: string[]): string[] => {
  if (!Array.isArray(sigs)) {
    sigs = [sigs]
  }

  sigs = [].concat.apply([], sigs)

  for (let i = 0; i < sigs.length; i++) {
    const sig = sigs[i]
    if (typeof sig === 'string' && sig.length === 130) {
      sigs[i] = ecc.Signature.from(sig).toString()
    }
  }

  return sigs
}

export const iteratePromises = (arr: any[], callback: (x: any[], i: number) => Promise<any>) => {
  const iterate = (index: number, array: any[], result: any): any => {
    if (index >= array.length) {
      return result
    }
    return callback(array[index], index)
      .then((res) => {
        result.push(res)
        return iterate(index + 1, array, result)
      })
  }

  return Promise.resolve().then(() => iterate(0, arr, []))
}

export const serialize = (chainId: string, serializedTransaction: Uint8Array) => {
  const api = new Api({ rpc: new JsonRpc(''), signatureProvider: new JsSignatureProvider([]) })
  const transaction = api.deserializeTransaction(serializedTransaction)
  const writer = new asn1.BerWriter()

  encode(writer, createNewBuffer(api, 'checksum256', chainId))
  encode(writer, createNewBuffer(api, 'time_point_sec', transaction.expiration))
  encode(writer, createNewBuffer(api, 'uint16', transaction.ref_block_num))
  encode(writer, createNewBuffer(api, 'uint32', transaction.ref_block_prefix))
  encode(writer, createNewBuffer(api, 'varuint32', 0)) // max_net_usage_words
  encode(writer, createNewBuffer(api, 'uint8', transaction.max_cpu_usage_ms))
  encode(writer, createNewBuffer(api, 'varuint32', transaction.delay_sec))

  encode(writer, createNewBuffer(api, 'uint8', 0)) // ctx_free_actions_size

  encode(writer, createNewBuffer(api, 'uint8', transaction.actions.length))
  for (const action of transaction.actions) {
    encode(writer, createNewBuffer(api, 'name', action.account))
    encode(writer, createNewBuffer(api, 'name', action.name))
    encode(writer, createNewBuffer(api, 'uint8', action.authorization.length))

    for (const authorization of action.authorization) {
      encode(writer, createNewBuffer(api, 'name', authorization.actor))
      encode(writer, createNewBuffer(api, 'name', authorization.permission))
    }

    const actionData = Buff.Buffer.from(action.data, 'hex')
    encode(writer, createNewBuffer(api, 'uint8', actionData.length))

    const actionDataBuffer = new Serialize.SerialBuffer({
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder(),
    })
    actionDataBuffer.pushArray(actionData)
    encode(writer, actionDataBuffer.asUint8Array())
  }

  encode(writer, createNewBuffer(api, 'uint8', 0)) // transaction_extensions
  encode(writer, createNewBuffer(api, 'checksum256', Buff.Buffer.alloc(32, 0).toString('hex'))) // ctx_free_data

  return writer.buffer
}

const createNewBuffer = (api: Api, type: string, data: any) => {
  const buffer = new Serialize.SerialBuffer({ textDecoder: new TextDecoder(), textEncoder: new TextEncoder() })

  api.serialize(buffer, type, data)
  return buffer.asUint8Array()
}

const encode = (writer: any , buffer: Uint8Array) => {
  writer.writeBuffer(Buff.Buffer.from(buffer), asn1.Ber.OctetString)
}
