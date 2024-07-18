import { DeepPartial } from "@vis-three/utils";
import { EngineSupport } from "../engine";
import { nanoid } from "nanoid";

export interface GlobalOption {
  proxy: {
    expand?: (c: any) => any;
    timing: "before" | "after";
    toRaw?: (c: any) => any;
  };
  symbol: {
    generator: Function;
    validator: (id: string) => boolean;
  };
  engine?: EngineSupport;
}

export const globalOption: GlobalOption = {
  proxy: {
    expand: undefined,
    timing: "before",
    toRaw: undefined,
  },
  symbol: {
    generator: nanoid,
    validator: (id) => id.length === 21,
  },
  engine: undefined,
};

export const defineOption = function (options: DeepPartial<GlobalOption>) {
  if (options.proxy) {
    Object.assign(globalOption.proxy, options.proxy);
  }

  if (options.symbol) {
    Object.assign(globalOption.symbol, options.symbol);
  }
};
