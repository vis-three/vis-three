import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
export declare class SceneDataSupport extends DataSupport<SceneCompilerTarget, SceneCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: SceneCompilerTarget);
}
