import { TokenConfig } from ".";
import { POLYGON } from "../chains/constants/Polygon";
import { ETHEREUM } from "../chains/constants/Ethereum";
import bicoIcon from "../../assets/bico.svg";

export const BICO: TokenConfig = {
  symbol: "BICO",
  image: bicoIcon,
  [POLYGON.chainId]: {
    address: "0x91c89A94567980f0e9723b487b0beD586eE96aa7",
    transferOverhead: 121335,
    decimal: 18,
    symbol: "BICO",
  },
  [ETHEREUM.chainId]: {
    address: "0xf17e65822b568b3903685a7c9f496cf7656cc6c2",
    transferOverhead: 121335,
    decimal: 18,
    symbol: "BICO",
  },
};
