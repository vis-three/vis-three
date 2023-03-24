import { Object3D } from "three";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { Object3DConfig } from "./Object3DConfig";

export class Object3DCompiler extends ObjectCompiler<Object3DConfig, Object3D> {
  constructor() {
    super();
  }
}
