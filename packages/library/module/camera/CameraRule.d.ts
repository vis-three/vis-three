import { ObjectRule } from "@vis-three/module-object";
import { Camera } from "three";
import { CameraCompiler } from "./CameraCompiler";
import { CameraConfigAllType } from "./CameraConfig";
export type CameraRule = ObjectRule<CameraCompiler, CameraConfigAllType, Camera>;
export declare const CameraRule: CameraRule;
