# UAL ReactJS Renderer

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
*See the [react example](https://github.com/EOSIO/ual-reactjs-renderer/tree/develop/) for more details.*

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

[Contributing Guide](https://github.com/EOSIO/ual-reactjs-renderer/blob/master/CONTRIBUTING.md)

[Code of Conduct](https://github.com/EOSIO/ual-reactjs-renderer/blob/master/CONTRIBUTING.md#conduct)

## License

[MIT](https://github.com/EOSIO/ual-reactjs-renderer/blob/master/LICENSE)

Copyright (c) 2017-2019 block.one all rights reserved.

The MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
