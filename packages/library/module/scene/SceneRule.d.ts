import { ObjectRule } from "@vis-three/module-object";
import { Scene } from "three";
import { SceneCompiler } from "./SceneCompiler";
import { SceneConfig } from "./SceneConfig";
export type SceneRule = ObjectRule<SceneCompiler, SceneConfig, Scene>;
export declare const SceneRule: SceneRule;
