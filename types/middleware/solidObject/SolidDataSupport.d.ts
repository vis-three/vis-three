import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObject3D, SolidObjectCompiler, SolidObjectCompilerTarget } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";
import { SolidObjectRule } from "./SolidObjectRule";
export declare class SolidObjectDataSupport<R extends SolidObjectRule<E, C, T, O>, E extends SolidObjectCompiler<C, T, O>, C extends SolidObjectConfig, T extends SolidObjectCompilerTarget<C>, O extends SolidObject3D> extends DataSupport<T, E> {
    MODULE: MODULETYPE;
    constructor(rule: R, data?: T);
}
