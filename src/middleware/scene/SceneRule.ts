import { Scene } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/DataContainer";
import { CONFIGTYPE } from "../constants/configType";
import { uniqueSymbol } from "../constants/UNIQUESYMBOL";
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
