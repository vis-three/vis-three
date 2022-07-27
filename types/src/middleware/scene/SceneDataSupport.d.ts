import { Scene } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";
export declare class SceneDataSupport extends ObjectDataSupport<SceneConfig, Scene, SceneCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: CompilerTarget<SceneConfig>, ignore?: IgnoreAttribute);
}
