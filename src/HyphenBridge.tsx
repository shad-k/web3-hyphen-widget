import React from "react";
import { Options } from "@biconomy/hyphen/dist/types";
import numeral from "numeral";

import Dropdown from "./components/Dropdown";
import useHyphenBridge from "./useHyphenBridge";
import { BigNumber } from "ethers";

interface IHyphenBridgeProps {
  provider: unknown;
  options: Options;
}

const HyphenBridge: React.FC<IHyphenBridgeProps> = ({ provider, options }) => {
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

  const [inProgress, setInProgress] = React.useState(false);

  const availableSourceOptions = React.useMemo(() => {
    return availableSourceChains.map((chainId) => {
      const chainConfig = getChainById(chainId);
      return {
        id: chainId,
        label: chainConfig.name,
        icon: chainConfig.image,
      };
    });
  }, [availableSourceChains, getChainById]);

  const availableDestinationOptions = React.useMemo(() => {
    return availableDestinationChains.map((chainId) => {
      const chainConfig = getChainById(chainId);
      return {
        id: chainId,
        label: chainConfig.name,
        icon: chainConfig.image,
      };
    });
  }, [availableDestinationChains, getChainById]);

  const availableTokenOptions = React.useMemo(() => {
    return availableTokens.map(({ symbol }) => {
      const tokenConfig = getTokenBySymbol(symbol);
      return {
        id: symbol,
        label: tokenConfig.symbol,
        icon: tokenConfig.image,
      };
    });
  }, [availableTokens, getTokenBySymbol]);

  const sendBridgingTransaction = async () => {
    if (inProgress) {
      return;
    }
    setInProgress(true);
    try {
      await bridge();
    } finally {
      setInProgress(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-6 bg-white shadow-lg rounded-3xl max-w-[600px]">
      <div className="bg-hyphen-purple/10 border rounded-3xl p-4 flex items-center justify-between">
        <Dropdown
          label="Source"
          options={availableSourceOptions}
          value={sourceChain.chainId}
          onChange={(val) => changeSourceChain(Number(val))}
        />
        <Dropdown
          label="Destination"
          options={availableDestinationOptions}
          value={destinationChain?.chainId}
          onChange={(val) => changeDestinationChain(Number(val))}
        />
      </div>
      <div className="bg-hyphen-purple/10 border rounded-3xl p-4 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <label>Amount</label>
          <input
            type="number"
            className="rounded-xl shadow-sm px-4 py-2 disabled:bg-white disabled:cursor-not-allowed disabled:text-gray-200"
            disabled={!sourceChain || !destinationChain || !selectedToken}
            onChange={(val) =>
              setTokenAmount(parseFloat((val.target as HTMLInputElement).value))
            }
            value={tokenAmount}
          />
          {poolInformation && (
            <div className="w-full flex items-center justify-between text-left text-gray-500 text-sm">
              <span>
                Min: {numeral(poolInformation.minDepositAmount).format("0a")}
              </span>
              <span>
                Max: {numeral(poolInformation.maxDepositAmount).format("0a")}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Dropdown
            label="Token"
            options={
              sourceChain && destinationChain ? availableTokenOptions : []
            }
            value={selectedToken?.symbol}
            onChange={(symbol) => changeToken(symbol as string)}
          />
          {userTokenBalance && (
            <span className="text-left text-gray-500 text-sm pl-2">
              Balance:{" "}
              {userTokenBalance.gt(BigNumber.from(0)) &&
                userTokenBalance.toString()}
            </span>
          )}
        </div>
      </div>
      <button
        className="bg-hyphen-purple border rounded-xl font-bold text-white w-48 mx-auto px-4 py-2 mt-4 disabled:bg-hyphen-purple/10 flex items-center justify-center"
        disabled={!!error || !destinationChain || !tokenAmount}
        onClick={sendBridgingTransaction}
      >
        {inProgress && (
          <div className="border-r border-r-3 border-white animate-spin rounded-r-full h-5 w-5 mr-2"></div>
        )}
        Bridge
      </button>
      <span className="text-red-500 text-sm mx-auto h-4">{error}</span>
    </div>
  );
};

export default HyphenBridge;
