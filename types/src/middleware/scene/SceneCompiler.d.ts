import { Scene } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import { SceneConfig } from "./SceneConfig";
export declare class SceneCompiler extends ObjectCompiler<SceneConfig, Scene> {
    MODULE: MODULETYPE;
    constructor();
}
