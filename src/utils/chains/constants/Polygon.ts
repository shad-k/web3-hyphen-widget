import { ChainConfig } from "..";
import { NATIVE_ADDRESS } from "../../constants";
import maticIcon from "../../../assets/matic.svg";

export const POLYGON: ChainConfig = {
  name: "Polygon",
  image: maticIcon,
  subText: "Polygon Mainnet",
  chainId: 137,
  rpcUrl: "https://polygon-rpc.com/",
  currency: "MATIC",
  nativeToken: NATIVE_ADDRESS,
  nativeDecimal: 18,
  nativeFaucetURL: "",
  assetSentTopicId:
    "0xec1dcc5633614eade4a5730f51adc7444a5103a8477965a32f2e886f5b20f694",
  explorerUrl: "https://polygonscan.com",
};
