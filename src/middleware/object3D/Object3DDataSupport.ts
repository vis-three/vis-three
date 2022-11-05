import { Object3D } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { Object3DCompiler } from "./Object3DCompiler";
import { Object3DConfig } from "./Object3DConfig";
import { Object3DRule } from "./Object3DRule";

export class Object3DDataSupport extends ObjectDataSupport<
  Object3DConfig,
  Object3D,
  Object3DCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.OBJECT3D;

  constructor(data: Array<Object3DConfig> = []) {
    super(Object3DRule, data);
  }
}
