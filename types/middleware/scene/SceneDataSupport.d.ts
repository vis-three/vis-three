import { Scene } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";
export declare class SceneDataSupport extends ObjectDataSupport<SceneRule, SceneCompiler, SceneConfig, SceneCompilerTarget, Scene> {
    MODULE: MODULETYPE;
    constructor(data?: SceneCompilerTarget, ignore?: IgnoreAttribute);
}
