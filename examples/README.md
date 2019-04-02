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

Navigate to http://localhost:3000 to see the example application

## Important

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
