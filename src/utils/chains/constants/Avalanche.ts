import { ChainConfig } from "..";
import { NATIVE_ADDRESS } from "../../constants";
import avaxIcon from "../../../assets/avax.svg";

export const AVALANCHE: ChainConfig = {
  name: "Avalanche",
  image: avaxIcon,
  subText: "Avalanche mainnet",
  chainId: 43114,
  rpcUrl: "https://api.avax.network/ext/bc/C/rpc",
  currency: "AVAX",
  nativeToken: NATIVE_ADDRESS,
  nativeDecimal: 18,
  nativeFaucetURL: "",
  assetSentTopicId:
    "0xec1dcc5633614eade4a5730f51adc7444a5103a8477965a32f2e886f5b20f694",
  explorerUrl: "https://snowtrace.io",
};
