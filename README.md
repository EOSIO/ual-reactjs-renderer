# UAL Renderer for ReactJS

This library provides a React renderer around the [Universal Authenticator Library](https://github.com/EOSIO/universal-authenticator-library). 

## Getting Started
#### With ``yarn``
```bash
yarn add @blockone/ual-reactjs-renderer
```
Then, install the authenticators that you wish to use...
```bash
yarn add @blockone/ual-scatter @blockone/ual-lynx
```
#### With ``npm``
```bash
npm i @blockone/ual-reactjs-renderer
```
Then, install the authenticators that you wish to use...
```bash
npm i @blockone/ual-scatter @blockone/ual-lynx
```

## Basic Usage
```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { UALProvider, withUAL } from '@blockone/ual-reactjs-renderer'
import { Scatter } from '@blockone/ual-scatter'
import { Lynx } from '@blockone/ual-lynx'

import { MyApp } from './MyApp'

const myChain = {
  chainId: MY_CHAIN_ID,
  rpcEndpoints: [{
    protocol: MY_CHAIN_PROTOCOL,
    host: MY_CHAIN_HOST,
    port: MY_CHAIN_PORT,
  }]
}

const scatter = new Scatter([myChain], { appName: 'My App' })
const lynx = new Lynx([myChain], { appName: 'My App' })

const MyUALConsumer = withUAL(MyApp)

ReactDOM.render(
  <UALProvider chains={[myChain]} authenticators={[scatter, lynx]} appName={'My App'}>
    <MyUALConsumer />
  </UALProvider>,
  document.getElementById('ual-app')
)
```

## Examples
A small example is provided in the [examples](https://github.com/EOSIO/ual-reactjs-renderer/tree/develop/examples) folder.

## Environment Set Up
**A one-time environment setup is required prior to development.**  The following commands provides a quick starting point.  Make sure you are in the ``examples/`` directory.
```bash
cd examples
cp default.env .env
```
Now that you have a ``.env`` file, you can set your chain particulars.  Note that this file will not be version-controlled, nor should it be.
The default settings for the file are...
```
CHAIN_ID=12345
RPC_PROTOCOL=https
RPC_HOST=api.example.net
RPC_PORT=443
```
These values can be edited according to the particulars of your project.  They will be used as the chain data in the example app.
*See the [Basic Example App for UAL with ReactJS](https://github.com/EOSIO/ual-reactjs-renderer/tree/develop/examples) for more details.*

## Development
After you set up your environment you can begin development.  Make sure you are back in the ``/`` directory of the ``ual-reactjs-renderer`` package.
```bash
yarn
yarn link
yarn build -w
```

In a duplicate terminal tab, enter the following commands:
```bash
cd examples
yarn link @blockone/ual-reactjs-renderer
yarn
yarn example
```

Open a browser at `localhost:4000` to see a running instance of the example.

*It is recommended to have at least two terminal tabs running so that `yarn build -w` and `yarn example` can run simultaneously creating an environment where changes are immediately reflected in the browser.*

## Contributing

[Contributing Guide](./CONTRIBUTING.md)

[Code of Conduct](./CONTRIBUTING.md#conduct)

## License

[MIT](./LICENSE)

## Important

See LICENSE for copyright and license terms.  Block.one makes its contribution on a voluntary basis as a member of the EOSIO community and is not responsible for ensuring the overall performance of the software or any related applications.  We make no representation, warranty, guarantee or undertaking in respect of the software or any related documentation, whether expressed or implied, including but not limited to the warranties or merchantability, fitness for a particular purpose and noninfringement. In no event shall we be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or documentation or the use or other dealings in the software or documentation.  Any test results or performance figures are indicative and will not reflect performance under all conditions.  Any reference to any third party or third-party product, service or other resource is not an endorsement or recommendation by Block.one.  We are not responsible, and disclaim any and all responsibility and liability, for your use of or reliance on any of these resources. Third-party resources may be updated, changed or terminated at any time, so the information here may be out of date or inaccurate.
