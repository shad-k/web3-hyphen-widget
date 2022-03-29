import { TokenConfig } from ".";
import { AVALANCHE } from "../chains/constants/Avalanche";
import { ETHEREUM } from "../chains/constants/Ethereum";
import { POLYGON } from "../chains/constants/Polygon";
import { NATIVE_ADDRESS } from "../constants";
import ethIcon from "../../assets/eth.svg";

export const ETH: TokenConfig = {
  symbol: "ETH",
  image: ethIcon,
  [POLYGON.chainId]: {
    address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    transferOverhead: 124000,
    decimal: 18,
    symbol: "ETH",
    fixedDecimalPoint: 5,
  },
  [ETHEREUM.chainId]: {
    address: NATIVE_ADDRESS,
    transferOverhead: 97000,
    decimal: 18,
    symbol: "ETH",
    fixedDecimalPoint: 5,
  },
  [AVALANCHE.chainId]: {
    address: "0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab",
    transferOverhead: 127000,
    decimal: 18,
    symbol: "ETH",
    fixedDecimalPoint: 5,
  },
};
