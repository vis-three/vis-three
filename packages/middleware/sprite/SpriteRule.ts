import { ProxyNotice } from "@vis-three/core";
import { Sprite } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
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
