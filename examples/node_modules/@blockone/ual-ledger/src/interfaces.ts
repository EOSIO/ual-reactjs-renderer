export const Name = 'Ledger'

export interface PendingRequest {
  resolve: (value?: boolean | PromiseLike<boolean>) => void
  reject: (reason?: any) => void
}

export interface LedgerOptions {
  appName: string
}
