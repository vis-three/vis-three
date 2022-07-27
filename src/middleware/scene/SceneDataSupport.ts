import { Scene } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SceneCompiler } from "./SceneCompiler";
import { getSceneConfig, SceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";

export class SceneDataSupport extends ObjectDataSupport<
  SceneConfig,
  Scene,
  SceneCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.SCENE;

  constructor(data?: CompilerTarget<SceneConfig>, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(SceneRule, data, ignore);
  }
}
