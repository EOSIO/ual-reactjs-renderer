# UAL React Example Application

This example demonstrates an implementation of the [Universal Authenticator Library React Renderer](https://github.com/EOSIO/universal-authenticator-library/tree/develop/packages/universal-authenticator-library-react) in a simple EOS transfer DAPP.  It uses the [UAL-Scatter](https://github.com/EOSIO/ual-scatter) and [UAL-Ledger](https://github.com/EOSIO/ual-ledger) authenticators.

## Setup
```
yarn
cp default.env .env
```

The example application uses an environment configuration for the chain and rpc endpoints.  Update the values in the .env file you created in the first step to point the application at your preferred chain and run the example.

## Environment Defaults
The ``.env`` file that is generated from the first step has the following defaults:
```
CHAIN_ID=12345
RPC_PROTOCOL=https
RPC_HOST=api.example.net
RPC_PORT=443
```

## The Transaction Object
In the main file of this demo, ``src/ButtonWebViewReact.tsx``, a ``demoTransaction`` is initiated and dispatched following a successful authentication and user click action.  This ``demoTransaction`` contains a simple transfer action - transferring a single EOS token from the authenticated user to an account named ``example``.
```javascript
const demoTransaction = {
  actions: [{
    account: 'eosio.token',
    name: 'transfer',
    authorization: [{
      actor: '', // use account that was logged in
      permission: 'active',
    }],
    data: {
      from: '', // use account that was logged in
      to: 'example',
      quantity: '1.0000 EOS',
      memo: 'UAL rocks!',
    },
  }],
}
```
While the example ``TransactionApp`` will populate the ``actor`` and ``from`` fields with the authenticated user, it's up to you to update the ``to`` field with a valid user on your chain.

## Run the example
```
yarn example
```

Navigate to http://localhost:4000 to see the example application