import { Object3D } from "three";
import { DataSupport } from "../../core/DataSupport";
import { Rule } from "../../core/Rule";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export class SolidObjectDataSupport<
  R extends Rule<E>,
  E extends SolidObjectCompiler<C, T, O>,
  C extends SolidObjectConfig,
  T extends SolidObjectCompilerTarget<C>,
  O extends Object3D
> extends DataSupport<T, E> {
  MODULE: MODULETYPE = MODULETYPE.MESH;

  constructor(rule: R, data?: T) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data!);
  }
}
