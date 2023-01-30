import { v4 } from "uuid";

export * as JSONHandler from "./JSONHandler";
export * as Template from "./Template";
export * from "./AntiShake";
export * from "./generateConfig";

export const createSymbol = function () {
  return v4();
};
