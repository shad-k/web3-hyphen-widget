import { TokenConfig } from ".";
import { AVALANCHE } from "../chains/constants/Avalanche";
import { ETHEREUM } from "../chains/constants/Ethereum";
import { POLYGON } from "../chains/constants/Polygon";
import usdcIcon from "../../assets/usdc.svg";

export const USDC: TokenConfig = {
  symbol: "USDC",
  image: usdcIcon,
  [POLYGON.chainId]: {
    address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    transferOverhead: 116000,
    decimal: 6,
    symbol: "USDC",
  },
  [ETHEREUM.chainId]: {
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    transferOverhead: 138000,
    decimal: 6,
    symbol: "USDC",
  },
  [AVALANCHE.chainId]: {
    address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
    transferOverhead: 127000,
    decimal: 6,
    symbol: "USDC",
  },
};
