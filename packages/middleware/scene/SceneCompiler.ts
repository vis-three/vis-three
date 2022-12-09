import { Scene } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { SceneConfig } from "./SceneConfig";
import SceneProcessor from "./SceneProcessor";

export class SceneCompiler extends ObjectCompiler<SceneConfig, Scene> {
  MODULE: MODULETYPE = MODULETYPE.SCENE;
  constructor() {
    super();
  }
}

Compiler.processor(SceneProcessor);
