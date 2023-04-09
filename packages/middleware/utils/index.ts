import { v4 } from "uuid";

export * as JSONHandler from "./JSONHandler";
export * as Template from "./template";
export * from "./AntiShake";
export * from "./generateConfig";
export * as Bus from "./Bus";

export const createSymbol = function () {
  return v4();
};
