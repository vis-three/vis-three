import { Scene } from "three";
import { DataSupport } from "../../core/DataSupport";
import { CONFIGTYPE } from "../constants/configType";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { getSceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";

export class SceneDataSupport extends DataSupport<SceneCompilerTarget, SceneCompiler> {
  constructor (data?: SceneCompilerTarget) {
    !data && (data = {
      [CONFIGTYPE.SCENE]: getSceneConfig()
    })
    super(SceneRule, data)
  }
}