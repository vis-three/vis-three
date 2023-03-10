import { SymbolConfig } from "../module/common";
import { v4, validate } from "uuid";

export interface GlobalOption {
  proxyExpand?: (c: SymbolConfig) => SymbolConfig;
  symbol: {
    generator: Function;
    validator: Function;
  };
}

export const globalOption: GlobalOption = {
  proxyExpand: undefined,
  symbol: {
    generator: v4,
    validator: validate,
  },
};
