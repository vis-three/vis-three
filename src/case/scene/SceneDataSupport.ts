import { Scene } from "three";
import { DataSupport } from "../../middleware/DataSupport";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { getSceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";

export class SceneDataSupport extends DataSupport<SceneCompilerTarget, SceneCompiler> {
  constructor (data?: SceneCompilerTarget) {
    !data && (data = {
      scene: getSceneConfig()
    })
    super(SceneRule, data)
  }
}