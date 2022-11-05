import { validate } from "uuid";
import { ProxyNotice } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
import { TextureCompiler } from "./TextureCompiler";

export const TextureRule: Rule<TextureCompiler> = function (
  notice: ProxyNotice,
  compiler: TextureCompiler
) {
  Rule(notice, compiler);
};
