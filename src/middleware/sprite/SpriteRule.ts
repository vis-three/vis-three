import { Sprite } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ObjectRule } from "../object/ObjectRule";
import { SpriteCompiler, SpriteCompilerTarget } from "./SpriteCompiler";
import { SpriteConfig } from "./SpriteConfig";

export type SpriteRule = ObjectRule<
  SpriteCompiler,
  SpriteConfig,
  SpriteCompilerTarget,
  Sprite
>;

export const SpriteRule: SpriteRule = function (
  notice: ProxyNotice,
  compiler: SpriteCompiler
) {
  const { operate, key, path, value } = notice;

  if (operate === "add") {
    if (validate(key)) {
      compiler.add(key, value);
    }
    return;
  }

  if (operate === "set") {
    const tempPath = path.concat([]);
    const vid = tempPath.shift() as string;
    compiler.set(vid, tempPath, key, value);
  }

  if (operate === "delete") {
    if (validate(key)) {
      compiler.remove(key);
    }
    return;
  }
};
