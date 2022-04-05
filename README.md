# Hyphen Bridge React Widget

## Introduction

A library written in TypeScript to integrate the [Hyphen Bridge](https://hyphen.biconomy.io/bridge) in React webapps/dapps.

Demo: https://codesandbox.io/s/sleepy-sutherland-cioeb1

## Installation

`yarn add @shad-k/hyphen-widget`

## Usage

#### React Component

The easiest way to integrate the bridge into your React application is to use the `HyphenBridge` component:

```
<HyphenBridge
  provider={provider}
  options={options}
/>
```

##### Props:

`provider` (required): An RPC provider object
`options` (optional): Options to configure the [Hyphen SDK](https://docs.biconomy.io/products/hyphen-instant-cross-chain-transfers/sdk#2.-importing-and-instantiation)

#### React Hook

If you want to customize the UI of the bridge you can use the React hook `useHyphenBridge` which is used by the above component also.

```
const {
  sourceChain,
  destinationChain,
  availableSourceChains,
  availableDestinationChains,
  availableTokens,
  getChainById,
  changeSourceChain,
  changeDestinationChain,
  getTokenBySymbol,
  changeToken,
  selectedToken,
  userTokenBalance,
  poolInformation,
  tokenAmount,
  setTokenAmount,
  error,
  bridge,
} = useHyphenBridge(provider, options);
```

## Contributing

To run the package locally, use
`yarn dev` or `yarn dev:watch` to run in watch mode.

After this use `yarn link` to use the package in another project on the same machine.

## License

Refer to LICENSE file
