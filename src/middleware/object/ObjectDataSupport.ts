import { Object3D } from "three";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";

export type BasicObjectDataSupport = ObjectDataSupport<
  Rule<
    ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>
  >,
  ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>,
  ObjectConfig,
  ObjectCompilerTarget<ObjectConfig>,
  Object3D
>;

export class ObjectDataSupport<
  R extends Rule<E>,
  E extends ObjectCompiler<C, T, O>,
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
> extends DataSupport<T, E> {
  MODULE: MODULETYPE = MODULETYPE.GROUP;

  constructor(rule: R, data?: T, ignore?: IgnoreAttribute) {
    !data && (data = Object.create(Object.prototype));
    super(rule, data!, ignore);
  }
}
