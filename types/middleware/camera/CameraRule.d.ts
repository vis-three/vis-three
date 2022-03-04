import { Camera } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { CameraCompiler, CameraCompilerTarget } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
export declare type CameraRule = ObjectRule<CameraCompiler, CameraConfigAllType, CameraCompilerTarget, Camera>;
export declare const CameraRule: CameraRule;
