import { CompileNotice, Compiler } from "../module";
import { Object3D } from "three";

import { ObjectConfig } from "./ObjectConfig";

export type BasicObjectCompiler = ObjectCompiler<ObjectConfig, Object3D>;

export abstract class ObjectCompiler<
  C extends ObjectConfig,
  O extends Object3D
> extends Compiler<C, O> {
  constructor() {
    super();
  }
}
