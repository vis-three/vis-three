import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { PassCompiler } from "./PassCompiler";

export const PassRule: Rule<PassCompiler> = function (
  input: ProxyNotice,
  compiler: PassCompiler
) {
  Rule(input, compiler);
};
