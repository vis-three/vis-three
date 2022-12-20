import { ProxyNotice } from "../module";
import { Scene } from "three";
import { validate } from "uuid";
import { uniqueSymbol } from "../common";
import { CONFIGTYPE } from "../constants/configType";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";

export type SceneRule = ObjectRule<SceneCompiler, SceneConfig, Scene>;

export const SceneRule: SceneRule = function (
  input: ProxyNotice,
  compiler: SceneCompiler
) {
  ObjectRule(input, compiler, (vid) => {
    return (
      validate(vid) ||
      [uniqueSymbol(CONFIGTYPE.SCENE)].includes(vid as CONFIGTYPE)
    );
  });
};
