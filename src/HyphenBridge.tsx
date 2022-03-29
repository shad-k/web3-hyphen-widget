import React from "react";
import { Options } from "@biconomy/hyphen/dist/types";

import Dropdown from "./components/Dropdown";
import useHyphenBridge from "./useHyphenBridge";

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
    getChainById,
    changeSourceChain,
    changeDestinationChain,
  } = useHyphenBridge(provider, options);

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

  return (
    <div className="flex flex-col gap-2 p-6 bg-white shadow-lg rounded-3xl">
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
    </div>
  );
};

export default HyphenBridge;
