# Basic Example App for UAL with ReactJS

This example demonstrates an implementation of the [Universal Authenticator Library Renderer for ReactJS](https://github.com/EOSIO/ual-reactjs-renderer) in a simple EOS transfer DAPP.  It uses the [UAL for Scatter Authenticator](https://github.com/EOSIO/ual-scatter) and [UAL for Ledger Authenticator](https://github.com/EOSIO/ual-ledger) authenticators.

![EOSIO Labs](https://img.shields.io/badge/EOSIO-Labs-5cb3ff.svg)

# About EOSIO Labs

EOSIO Labs repositories are experimental.  Developers in the community are encouraged to use EOSIO Labs repositories as the basis for code and concepts to incorporate into their applications. Community members are also welcome to contribute and further develop these repositories. Since these repositories are not supported by Block.one, we may not provide responses to issue reports, pull requests, updates to functionality, or other requests from the community, and we encourage the community to take responsibility for these.

## Setup
```
yarn
cp default.env .env
```

The example application uses an environment configuration for the chain and rpc endpoints.  Update the values in the .env file you created in the first step to point the application at your preferred chain and run the example.

## Environment Defaults
The ``.env`` file that is generated from the first step has the following defaults:
```
CHAIN_ID=cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f
RPC_PROTOCOL=http
RPC_HOST=localhost
RPC_PORT=8888
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

Navigate to http://localhost:3000 to see the example application

## License

[MIT](./LICENSE)

## Important

See [LICENSE](./LICENSE) for copyright and license terms.

All repositories and other materials are provided subject to the terms of this [IMPORTANT](./IMPORTANT.md) notice and you must familiarize yourself with its terms.  The notice contains important information, limitations and restrictions relating to our software, publications, trademarks, third-party resources, and forward-looking statements.  By accessing any of our repositories and other materials, you accept and agree to the terms of the notice.
