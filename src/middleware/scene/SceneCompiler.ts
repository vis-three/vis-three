import { Scene } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SceneConfig } from "./SceneConfig";
import SceneProcessor from "./SceneProcessor";

export interface SceneCompilerTarget extends ObjectCompilerTarget<SceneConfig> {
  [key: string]: SceneConfig;
}

export class SceneCompiler extends ObjectCompiler<
  SceneConfig,
  SceneCompilerTarget,
  Scene
> {
  MODULE: MODULETYPE = MODULETYPE.SCENE;
  constructor() {
    super();
  }
}

Compiler.processor(SceneProcessor);
