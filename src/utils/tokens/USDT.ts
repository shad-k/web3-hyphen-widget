import { TokenConfig } from ".";
import { ETHEREUM } from "../chains/constants/Ethereum";
import { POLYGON } from "../chains/constants/Polygon";
import usdtIcon from "../../assets/usdt.svg";

export const USDT: TokenConfig = {
  symbol: "USDT",
  image: usdtIcon,
  [POLYGON.chainId]: {
    address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    transferOverhead: 130000,
    decimal: 6,
    symbol: "USDT",
  },
  [ETHEREUM.chainId]: {
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    transferOverhead: 135000,
    decimal: 6,
    symbol: "USDT",
  },
};
