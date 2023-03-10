import { Scene } from "three";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { SceneConfig } from "./SceneConfig";

export class SceneCompiler extends ObjectCompiler<SceneConfig, Scene> {
  constructor() {
    super();
  }
}
