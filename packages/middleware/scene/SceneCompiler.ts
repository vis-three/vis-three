import { Compiler } from "@vis-three/core";
import { Scene } from "three";
import { MODULETYPE } from "../constants";
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
