import { Camera } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { SetSizeEvent } from "@vis-three/core";
import { ObjectCompiler } from "@vis-three/module-object";
export declare class CameraCompiler extends ObjectCompiler<CameraConfigAllType, Camera> {
    cacheCameraMap: WeakMap<Camera, (event: SetSizeEvent) => void>;
    constructor();
}
