import { Object3D } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { Object3DCompiler } from "./Object3DCompiler";
import { Object3DConfig } from "./Object3DConfig";
export type Object3DRule = ObjectRule<Object3DCompiler, Object3DConfig, Object3D>;
export declare const Object3DRule: Object3DRule;
