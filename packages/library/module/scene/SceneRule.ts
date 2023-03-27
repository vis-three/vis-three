import { ProxyNotice, uniqueSymbol } from "@vis-three/middleware";
import { ObjectRule } from "@vis-three/module-object";
import { Scene } from "three";
import { validate } from "uuid";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";

export type SceneRule = ObjectRule<SceneCompiler, SceneConfig, Scene>;

const symbolList = [uniqueSymbol("Scene")];

export const SceneRule: SceneRule = function (
  input: ProxyNotice,
  compiler: SceneCompiler
) {
  ObjectRule(input, compiler, (vid) => {
    return validate(vid) || symbolList.includes(vid);
  });
};
