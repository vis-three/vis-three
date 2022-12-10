import { Compiler } from "@vis-three/core";
import { Object3D } from "three";
import { MODULETYPE } from "../constants";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { Object3DConfig } from "./Object3DConfig";
import Object3DProcessor from "./Object3DProcessor";

export class Object3DCompiler extends ObjectCompiler<Object3DConfig, Object3D> {
  MODULE: MODULETYPE = MODULETYPE.OBJECT3D;

  constructor() {
    super();
  }
}

Compiler.processor(Object3DProcessor);
