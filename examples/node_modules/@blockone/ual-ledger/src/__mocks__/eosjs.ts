export class Api {
  public transact = jest.fn().mockImplementation(async () => {
    return {
      transaction_id: 'testid',
      processed: {
        receipt: {
          status: 'complete',
        }
      }
    }
  })
}

export class JsonRpc {
  public get_account = jest.fn().mockImplementation(async (account) => { // tslint:disable-line
    if (!account) {
      throw Error('No accountName provided')
    }

    return {
      permissions: [{
        required_auth: {
          keys: [{
            key: 'EOS11111',
          }],
        }
      }],
    }
  })
} // tslint:disable-line max-classes-per-file
