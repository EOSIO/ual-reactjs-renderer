import { Scatter } from '@blockone/ual-scatter'

const EXAMPLE_ENV = {
  CHAIN_ID: '1',
  RPC_PROTOCOL: 'https',
  RPC_HOST: 'dummy.net',
  RPC_PORT: 4000,
}

const exampleNet = {
  chainId: EXAMPLE_ENV.CHAIN_ID,
  rpcEndpoints: [{
    protocol: EXAMPLE_ENV.RPC_PROTOCOL,
    host: EXAMPLE_ENV.RPC_HOST,
    port: Number(EXAMPLE_ENV.RPC_PORT),
  }],
}

export const providerProps = {
  chains: [exampleNet],
  authenticators: [new Scatter([exampleNet], { appName: 'My Working App' })],
  appName: 'My app',
}
