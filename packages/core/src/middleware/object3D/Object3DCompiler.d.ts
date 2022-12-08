import { Object3D } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { Object3DConfig } from "./Object3DConfig";
export declare class Object3DCompiler extends ObjectCompiler<Object3DConfig, Object3D> {
    MODULE: MODULETYPE;
    constructor();
}
