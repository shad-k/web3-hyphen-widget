import React from "react";
import { Hyphen } from "@biconomy/hyphen";
import { Options, SupportedToken } from "@biconomy/hyphen/dist/types";
import { ChainConfig, chainMap, chains } from "./utils/chains";

type UseHyphenBridgeReturn = {
  supportedChainIds: Array<number>;
  supportedChains: ChainConfig[];
  sourceChain: ChainConfig;
  destinationChain?: ChainConfig;
  hyphen?: Hyphen;
  getChainById: (chainId: number) => ChainConfig;
  availableDestinationChains: Array<number>;
  availableSourceChains: Array<number>;
  changeSourceChain: (chainId: number) => void;
  changeDestinationChain: (chainId: number) => void;
};

const useHyphenBridge = (
  provider: unknown,
  options: Options = {
    debug: true, // If 'true', it prints debug logs on console window
    environment: "prod", // It can be "test" or "prod"
  }
): UseHyphenBridgeReturn => {
  const [hyphenObject, setHyphenObject] = React.useState<Hyphen>();
  const [sourceChain, setSourceChain] = React.useState<ChainConfig>(chains[0]);
  const [destinationChain, setDestinationChain] = React.useState<ChainConfig>();
  const [availableDestinationChains, setAvailableDestinationChains] =
    React.useState<number[]>([]);

  const getChainById = React.useCallback((chainId: number): ChainConfig => {
    return chains.find(({ chainId: id }) => id === chainId) ?? chains[0];
  }, []);

  const changeSourceChain = React.useCallback(
    (chainId: number) => {
      setSourceChain(getChainById(chainId));
      setDestinationChain(undefined);
      setAvailableDestinationChains(chainMap[chainId]);
    },
    [getChainById]
  );

  const changeDestinationChain = React.useCallback(
    (chainId: number) => {
      setDestinationChain(getChainById(chainId));
    },
    [getChainById]
  );

  React.useEffect(() => {
    const hyphen = new Hyphen(provider, options);
    (async () => {
      await hyphen.init();

      setHyphenObject(hyphen);
    })();
  }, [options, provider]);

  React.useEffect(() => {
    changeSourceChain(chains[1].chainId);
  }, [changeSourceChain]);

  const chainIds = chains.map(({ chainId }) => chainId);

  return {
    hyphen: hyphenObject,
    supportedChainIds: chainIds,
    supportedChains: chains,
    sourceChain,
    destinationChain,
    getChainById,
    availableDestinationChains,
    availableSourceChains: chainIds,
    changeSourceChain,
    changeDestinationChain,
    /**
     * availableTokens
     * token
     * changeToken
     * currentChain
     * userTokenBalance
     * currentChain
     * changeChain
     * tokenAmount
     * error
     */
  };
};

export default useHyphenBridge;
