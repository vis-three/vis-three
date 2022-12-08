import { Object3D } from "three";
import { DataSupport } from "../../core/DataSupport";
import { Rule } from "../../core/Rule";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "./ObjectCompiler";
import { ObjectConfig } from "./ObjectConfig";
export type BasicObjectDataSupport = ObjectDataSupport<ObjectConfig, Object3D, ObjectCompiler<ObjectConfig, Object3D>>;
export declare class ObjectDataSupport<C extends ObjectConfig, O extends Object3D, P extends ObjectCompiler<C, O>> extends DataSupport<C, O, P> {
    MODULE: MODULETYPE;
    constructor(rule: Rule<P>, data?: Array<C>);
}
