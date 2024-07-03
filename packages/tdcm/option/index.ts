import { DeepPartial } from "@vis-three/utils";
import { v4, validate } from "uuid";

export interface GlobalOption {
  proxy: {
    expand?: (c: any) => any;
    timing: "before" | "after";
    toRaw?: (c: any) => any;
  };
  symbol: {
    generator: Function;
    validator: Function;
  };
}

export const globalOption: GlobalOption = {
  proxy: {
    expand: undefined,
    timing: "before",
    toRaw: undefined,
  },
  symbol: {
    generator: v4,
    validator: validate,
  },
};

export const defineOption = function (options: DeepPartial<GlobalOption>) {
  if (options.proxy) {
    Object.assign(globalOption.proxy, options.proxy);
  }

  if (options.symbol) {
    Object.assign(globalOption.symbol, options.symbol);
  }
};
