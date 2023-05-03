import { DeepPartial } from "@vis-three/utils";
import { v4, validate } from "uuid";

export interface GlobalOption {
  proxyExpand?: (c: any) => any;
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

export const defineOption = function (options: DeepPartial<GlobalOption>) {
  Object.assign(globalOption, options);
};
