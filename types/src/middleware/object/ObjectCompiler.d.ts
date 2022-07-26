import { Object3D } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { ObjectConfig } from "./ObjectConfig";
export declare type BasicObjectCompiler = ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>;
export interface ObjectCompilerTarget<C extends ObjectConfig> extends CompilerTarget<C> {
}
export declare abstract class ObjectCompiler<C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D> extends Compiler<C, T, O> {
    IS_OBJECTCOMPILER: boolean;
    constructor();
}
