import { Sprite } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";

export type SpriteRule = SolidObjectRule<
  SpriteCompiler,
  SpriteConfig,
  SpriteCompilerTarget,
  Sprite
>;

export const SpriteRule: SpriteRule = function (
  notice: ProxyNotice,
  compiler: SpriteCompiler
) {
  if (notice.key === "geometry") {
    return;
  }

  ObjectRule(notice, compiler);
};
