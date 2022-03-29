import { AVALANCHE } from "./constants/Avalanche";
import { ETHEREUM } from "./constants/Ethereum";
import { POLYGON } from "./constants/Polygon";

const chainPairs = [
  [AVALANCHE, ETHEREUM],
  [AVALANCHE, POLYGON],
  [ETHEREUM, POLYGON],
];

const chainMap = chainPairs.reduce((acc, pair) => {
  acc[pair[0].chainId] = [...(acc[pair[0].chainId] || []), pair[1].chainId];
  acc[pair[1].chainId] = [...(acc[pair[1].chainId] || []), pair[0].chainId];
  return acc;
}, {} as ChainMap);

export type ChainMap = { [fromChainId: number]: number[] };

export type ChainConfig = {
  name: string;
  image?: string;
  subText: string;
  chainId: number;
  rpcUrl: string;
  currency: string;
  nativeDecimal: number;
  nativeToken: string;
  nativeFaucetURL: string;
  assetSentTopicId: string;
  explorerUrl: string;
};

const chains: ChainConfig[] = [POLYGON, ETHEREUM, AVALANCHE];
export { chainMap, chains };
