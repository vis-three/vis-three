
import { ProxyNotice, Rule } from "../module";
import { TextureCompiler } from "./TextureCompiler";

export const TextureRule: Rule<TextureCompiler> = function (
  notice: ProxyNotice,
  compiler: TextureCompiler
) {
  Rule(notice, compiler);
};
