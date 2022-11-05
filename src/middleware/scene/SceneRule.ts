import { Scene } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";

export type SceneRule = ObjectRule<SceneCompiler, SceneConfig, Scene>;

export const SceneRule: SceneRule = function (
  input: ProxyNotice,
  compiler: SceneCompiler
) {
  Rule(input, compiler, (vid) => {
    return validate(vid) || [CONFIGTYPE.SCENE].includes(vid as CONFIGTYPE);
  });
};
