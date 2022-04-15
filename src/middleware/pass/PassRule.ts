import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { PassCompiler } from "./PassCompiler";

export const PassRule: Rule<PassCompiler> = function (
  input: ProxyNotice,
  compiler: PassCompiler
) {
  const { operate, key, value } = input;
  if (operate === "add") {
    compiler.add(value);
    return;
  }

  if (operate === "delete") {
    compiler.remove(value.vid);
  }
};
