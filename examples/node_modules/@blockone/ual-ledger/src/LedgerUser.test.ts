
import { LedgerUser } from './LedgerUser'

describe('LedgerUser', () => {
  let app
  const exampleNet = {
    chainId: '',
    rpcEndpoints: [{
      protocol: '',
      host: '',
      port: 0,
    }]
  }

  beforeEach(async () => {
    app = new LedgerUser(exampleNet, 'theflash')
    await app.init()
  })

  it('init sets the rpc and api properties', () => {
    expect(app.rpc).toBeDefined()
    expect(app.api).toBeDefined()
  })

  it('signsTransactions', async () => {
    const transaction = {
      transaction_id: 'testid',
      processed: {
        receipt: {
          status: 'complete',
        }
      }
    }

    const completedTransaction = {
      transaction_id: 'testid',
      processed: {
        receipt: {
          status: 'complete',
        }
      }
    }
    const config = { broadcast: true, blocksBehind: 3, expireSeconds: 30 }
    expect(await app.signTransaction(transaction, config)).toEqual(
      app.returnEosjsTransaction(config.broadcast, completedTransaction)
    )
  })

  it('returns the accountName', async () => {
    expect(await app.getAccountName()).toEqual('theflash')
  })

  it('gets the keys', async () => {
    expect(await app.getKeys()).toEqual([
      'EOS11111',
      'EOS22222',
    ])
  })

  it('extractaccountKeys', async () => {
    const account = {
      permissions: [{
        required_auth: {
          keys: [{
            key: 'EOS11111',
          }],
        }
      }]
    }

    const result = [account.permissions[0].required_auth.keys[0].key]
    expect(await app.extractAccountKeys(account)).toEqual(result)
  })
})
