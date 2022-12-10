import { ProxyNotice, Rule } from "@vis-three/core";
import { TextureCompiler } from "./TextureCompiler";

export const TextureRule: Rule<TextureCompiler> = function (
  notice: ProxyNotice,
  compiler: TextureCompiler
) {
  Rule(notice, compiler);
};
