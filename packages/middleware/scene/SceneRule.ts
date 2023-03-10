import { ProxyNotice } from "../module";
import { Scene } from "three";
import { validate } from "uuid";
import { uniqueSymbol } from "../module/common";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";

export type SceneRule = ObjectRule<SceneCompiler, SceneConfig, Scene>;

export const SceneRule: SceneRule = function (
  input: ProxyNotice,
  compiler: SceneCompiler
) {
  ObjectRule(input, compiler, (vid) => {
    return validate(vid) || [uniqueSymbol("SCENE")].includes(vid);
  });
};
