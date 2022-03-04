import { Object3D } from "three";
import { DataSupport } from "../../core/DataSupport";
import { Rule } from "../../core/Rule";
import { ObjectCompiler, ObjectCompilerTarget } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export declare type BasicObjectDataSupport = ObjectDataSupport<Rule<ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>>, ObjectCompiler<ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>, ObjectConfig, ObjectCompilerTarget<ObjectConfig>, Object3D>;
export declare class ObjectDataSupport<R extends Rule<E>, E extends ObjectCompiler<C, T, O>, C extends ObjectConfig, T extends ObjectCompilerTarget<C>, O extends Object3D> extends DataSupport<T, E> {
    IS_OBJECTDATASUPPORT: boolean;
    constructor(rule: R, data?: T);
}
