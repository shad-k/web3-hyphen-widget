import React from "react";
import { Hyphen } from "@biconomy/hyphen";
import type { Options } from "@biconomy/hyphen/dist/types";
import { BigNumber, ethers } from "ethers";

import { ChainConfig, chainMap, chains } from "./utils/chains";
import { TokenConfig, tokens } from "./utils/tokens";
import erc20ABI from "./utils/contracts/erc20.abi.json";

type UseHyphenBridgeReturn = {
  availableChainIds: Array<number>;
  availableChains: ChainConfig[];
  availableTokens: TokenConfig[];
  availableTokenSymbols: Array<string>;
  sourceChain: ChainConfig;
  getChainById: (chainId: number) => ChainConfig;
  getTokenBySymbol: (symbol: string) => TokenConfig;
  availableDestinationChains: Array<number>;
  availableSourceChains: Array<number>;
  changeSourceChain: (chainId: number) => void;
  changeDestinationChain: (chainId: number) => void;
  changeToken: (symbol: string) => void;
  provider: any;
  tokenAmount: number;
  setTokenAmount: (value: number) => void;
  userTokenBalance: ethers.BigNumber;
  destinationChain?: ChainConfig;
  hyphen?: Hyphen;
  currentNetwork?: ethers.providers.Network;
  selectedToken?: TokenConfig;
  poolInformation?: any;
  error?: string;
};

const useHyphenBridge = (
  provider: any,
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
  const [currentNetwork, setNetwork] =
    React.useState<ethers.providers.Network>();
  const [selectedToken, setSelectedToken] = React.useState<TokenConfig>();
  const [tokenAmount, setTokenAmount] = React.useState<number>(0.0);
  const [userTokenBalance, setUserTokenBalance] = React.useState<BigNumber>(
    BigNumber.from(0)
  );
  const [availableTokens, setAvailableTokens] =
    React.useState<Array<TokenConfig>>(tokens);
  const [poolInformation, setPoolInformation] = React.useState<any>();
  const [error, setError] = React.useState<string>();

  const getChainById = React.useCallback((chainId: number): ChainConfig => {
    return chains.find(({ chainId: id }) => id === chainId) ?? chains[0];
  }, []);

  const getTokenBySymbol = React.useCallback((symbol: string): TokenConfig => {
    return (
      tokens.find(({ symbol: tokenSymbol }) => tokenSymbol === symbol) ??
      tokens[0]
    );
  }, []);

  const changeSourceChain = React.useCallback(
    (chainId: number) => {
      setSourceChain(getChainById(chainId));
      setDestinationChain(undefined);
      setAvailableDestinationChains(chainMap[chainId]);
      const availableTokensOnSourceChain = tokens.filter(
        (token) => token[chainId]
      );
      setAvailableTokens(availableTokensOnSourceChain);
    },
    [getChainById]
  );

  const changeDestinationChain = React.useCallback(
    (chainId: number) => {
      setDestinationChain(getChainById(chainId));
      const availableTokensOnSourceChain = availableTokens.filter(
        (token) => token[chainId]
      );
      setAvailableTokens(availableTokensOnSourceChain);
    },
    [getChainById, availableTokens]
  );

  const changeToken = React.useCallback(
    async (symbol: string) => {
      const token = getTokenBySymbol(symbol);
      setSelectedToken(token);
      const sourceChainId = sourceChain.chainId;
      const destinationChainId = destinationChain?.chainId;
      const poolInformation = await hyphenObject?.getPoolInformation(
        token[sourceChainId].address,
        sourceChainId,
        destinationChainId as number
      );

      setPoolInformation(poolInformation);
    },
    [getTokenBySymbol, hyphenObject, sourceChain, destinationChain]
  );

  React.useEffect(() => {
    const hyphen = new Hyphen(provider, options);
    (async () => {
      await hyphen.init();

      setHyphenObject(hyphen);

      const network = await provider.getNetwork();
      setNetwork(network);
    })();
  }, [options, provider]);

  // setting the initial state for the source chain
  React.useEffect(() => {
    changeSourceChain(chains[0].chainId);
  }, [changeSourceChain]);

  React.useEffect(() => {
    (async () => {
      if (selectedToken && selectedToken.symbol) {
        const userAddress = await provider.send("eth_requestAccounts", []);
        if (selectedToken.symbol === "ETH") {
          const balance = await provider.getBalance(userAddress[0]);
          setUserTokenBalance(balance);
        } else {
          const chainId = sourceChain.chainId;
          const tokenContract = new ethers.Contract(
            selectedToken[chainId].address,
            erc20ABI,
            provider
          );

          const balance = await tokenContract.balanceOf(userAddress[0]);
          setUserTokenBalance(balance);
        }
      }
    })();
  }, [selectedToken, sourceChain.chainId, provider]);

  React.useEffect(() => {
    if (tokenAmount && poolInformation) {
      if (
        tokenAmount < poolInformation.minDepositAmount ||
        tokenAmount > poolInformation.maxDepositAmount
      ) {
        setError("Amount has to be within the required range!");
        return;
      }
    }
    setError(undefined);
  }, [tokenAmount, poolInformation]);

  const chainIds = chains.map(({ chainId }) => chainId);
  const tokenSymbols = availableTokens.map(({ symbol }) => symbol);

  return {
    hyphen: hyphenObject,
    availableChainIds: chainIds,
    availableChains: chains,
    sourceChain,
    destinationChain,
    getChainById,
    availableDestinationChains,
    availableSourceChains: chainIds,
    changeSourceChain,
    changeDestinationChain,
    availableTokens,
    availableTokenSymbols: tokenSymbols,
    currentNetwork,
    provider,
    changeToken,
    userTokenBalance,
    tokenAmount,
    setTokenAmount,
    getTokenBySymbol,
    selectedToken,
    poolInformation,
    error,
    /**
     * changeChain
     */
  };
};

export default useHyphenBridge;
