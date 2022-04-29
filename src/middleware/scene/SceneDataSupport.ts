import { Scene } from "three";
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

  constructor(data?: SceneCompilerTarget) {
    !data && (data = {});
    super(SceneRule, data);
  }
}
