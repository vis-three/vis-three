import { Object3D } from "three";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObject3D,
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
import { SolidObjectRule } from "./SolidObjectRule";

export class SolidObjectDataSupport<
  R extends SolidObjectRule<E, C, T, O>,
  E extends SolidObjectCompiler<C, T, O>,
  C extends SolidObjectConfig,
  T extends SolidObjectCompilerTarget<C>,
  O extends SolidObject3D
> extends DataSupport<T, E> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor(rule: R, data?: T, ignore?: IgnoreAttribute) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data!, ignore);
  }
}
