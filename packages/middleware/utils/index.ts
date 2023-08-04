import { globalOption } from "../option";

export * as JSONHandler from "./JSONHandler";
export * as Template from "./template";
export * from "./AntiShake";
export * from "./generateConfig";
export * as Bus from "./Bus";
export * from "./Trigger";

export const createSymbol = function () {
  return globalOption.symbol.generator();
};
