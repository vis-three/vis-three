import { ProxyNotice } from "@vis-three/middleware";
import { ObjectRule } from "@vis-three/module-object";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Sprite } from "three";
import { SpriteCompiler } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";

export type SpriteRule = SolidObjectRule<SpriteCompiler, SpriteConfig, Sprite>;

export const SpriteRule: SpriteRule = function (
  notice: ProxyNotice,
  compiler: SpriteCompiler
) {
  if (notice.key === "geometry") {
    return;
  }

  ObjectRule(notice, compiler);
};
