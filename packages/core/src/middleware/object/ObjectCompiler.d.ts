import { Object3D } from "three";
import { Compiler } from "../../core/Compiler";
import { ObjectConfig } from "./ObjectConfig";
export type BasicObjectCompiler = ObjectCompiler<ObjectConfig, Object3D>;
export declare abstract class ObjectCompiler<C extends ObjectConfig, O extends Object3D> extends Compiler<C, O> {
    constructor();
}
