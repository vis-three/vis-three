import { Scene } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { getSceneConfig, SceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";

export class SceneDataSupport extends ObjectDataSupport<
  SceneRule,
  SceneCompiler,
  SceneConfig,
  SceneCompilerTarget,
  Scene
> {
  MODULE: MODULETYPE = MODULETYPE.SCENE;

  constructor(data?: SceneCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(SceneRule, data, ignore);
  }
}
