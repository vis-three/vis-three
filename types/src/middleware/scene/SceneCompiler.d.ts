import { Scene } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SceneConfig } from "./SceneConfig";
export interface SceneCompilerTarget extends ObjectCompilerTarget<SceneConfig> {
    [key: string]: SceneConfig;
}
export declare class SceneCompiler extends ObjectCompiler<SceneConfig, SceneCompilerTarget, Scene> {
    MODULE: MODULETYPE;
    constructor();
}
