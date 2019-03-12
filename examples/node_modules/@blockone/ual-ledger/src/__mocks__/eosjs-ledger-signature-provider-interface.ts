export class SignatureProvider {
  public getAvailableKeys = jest.fn().mockImplementation(() => ([
    'EOS11111',
    'EOS22222',
  ]))

  public cleanUp = jest.fn()
  public clearCachedKeys = jest.fn()
}
