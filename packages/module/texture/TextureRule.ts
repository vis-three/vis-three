
import { ProxyNotice, Rule } from "@vis-three/middleware";
import { TextureCompiler } from "./TextureCompiler";

export const TextureRule: Rule<TextureCompiler> = function (
  notice: ProxyNotice,
  compiler: TextureCompiler
) {
  Rule(notice, compiler);
};
