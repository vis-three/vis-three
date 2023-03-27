import { ObjectCompiler } from "@vis-three/module-object";
import { Scene } from "three";
import { SceneConfig } from "./SceneConfig";

export class SceneCompiler extends ObjectCompiler<SceneConfig, Scene> {
  constructor() {
    super();
  }
}
