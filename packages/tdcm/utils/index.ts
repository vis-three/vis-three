import { globalOption } from "../option";
import { getObserver } from "./utils";

export * as JSONHandler from "./JSONHandler";
export * as Template from "./template";
export * from "./AntiShake";
export * from "./generateConfig";
export * as Bus from "./Bus";
export * from "./Trigger";

export const createSymbol = function () {
  return globalOption.symbol.generator();
};

export const slientUpdate = function (config: any, fun: () => void) {
  const ob = getObserver(config);
  if (!ob) {
    console.warn(`this object can not found it observer:`, config);
    return;
  }

  ob.disable = true;

  fun();

  ob.disable = false;
};
