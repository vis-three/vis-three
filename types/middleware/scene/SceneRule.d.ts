import { Scene } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { SceneCompiler, SceneCompilerTarget } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";
export declare type SceneRule = ObjectRule<SceneCompiler, SceneConfig, SceneCompilerTarget, Scene>;
export declare const SceneRule: SceneRule;
