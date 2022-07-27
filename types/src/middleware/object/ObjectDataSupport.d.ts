import { Object3D } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export declare type BasicObjectDataSupport = ObjectDataSupport<ObjectConfig, Object3D, ObjectCompiler<ObjectConfig, Object3D>>;
export declare class ObjectDataSupport<C extends ObjectConfig, O extends Object3D, P extends ObjectCompiler<C, O>> extends DataSupport<C, O, P> {
    MODULE: MODULETYPE;
    constructor(rule: Rule<P>, data?: CompilerTarget<C>, ignore?: IgnoreAttribute);
}
