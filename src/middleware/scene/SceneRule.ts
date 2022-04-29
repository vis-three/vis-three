import { Scene } from "three";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";

export type SceneRule = ObjectRule<
  SceneCompiler,
  SceneConfig,
  SceneCompilerTarget,
  Scene
>;

export const SceneRule: SceneRule = function (
  notice: ProxyNotice,
  compiler: SceneCompiler
) {
  ObjectRule(notice, compiler);
};
