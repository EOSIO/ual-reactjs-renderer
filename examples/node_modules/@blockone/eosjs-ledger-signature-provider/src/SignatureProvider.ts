import { Api } from 'eosjs'
import { LedgerAPI } from './LedgerAPI'
import { getTransport } from './LedgerUtils'

interface SignatureProviderInterface {
  eosjsApi: Api
  ledgerApi: LedgerAPI
  cachedKeys: string[]
}

export class SignatureProvider implements SignatureProviderInterface {
  public eosjsApi: Api = null
  public ledgerApi: LedgerAPI = null
  public cachedKeys: string[] = []

  public async getLedgerApi() {
    if (this.ledgerApi) {
      return this.ledgerApi
    }

    const transport = await getTransport()
    this.ledgerApi = new LedgerAPI(transport)
    return this.ledgerApi
  }

  /** Public keys associated with the private keys that the `SignatureProvider` holds */
  public async getAvailableKeys(requestPermission?: boolean) {
    if (this.cachedKeys.length) {
      return this.cachedKeys
    }

    try {
      const api = await this.getLedgerApi()
      const key = await api.getPublicKey(requestPermission)
      this.cachedKeys = [key]
      return this.cachedKeys
    } catch (error) {
      throw error
    }
  }

  /** Sign a transaction */
  public async sign({ chainId, serializedTransaction }: { chainId: string, serializedTransaction: Uint8Array }) {
    try {
      const api = await this.getLedgerApi()
      const signatures = await api.signTransaction({ chainId, serializedTransaction })
      return { signatures, serializedTransaction }
    } catch (error) {
      throw error
    }
  }

  protected getCachedKeys(): string[] {
    return this.cachedKeys
  }

  protected setCachedKeys(keys: string[]): void {
    this.cachedKeys = keys
  }

  public clearCachedKeys(): void {
    this.cachedKeys = null
  }

  public cleanUp(): void {
    return
  }
}
