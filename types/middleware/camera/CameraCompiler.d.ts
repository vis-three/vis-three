import { Camera, Vector3 } from "three";
import { SetSizeEvent } from "../../plugins/WebGLRendererPlugin";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
export interface CameraCompilerTarget extends ObjectCompilerTarget<CameraConfigAllType> {
    [key: string]: CameraConfigAllType;
}
export interface CacheCameraData {
    lookAtTarget?: Vector3;
    updateMatrixWorldFun?: (focus: boolean) => void;
    setSizeFun?: (event: SetSizeEvent) => void;
}
export declare class CameraCompiler extends ObjectCompiler<CameraConfigAllType, CameraCompilerTarget, Camera> {
    COMPILER_NAME: string;
    private constructMap;
    private cacheCameraMap;
    constructor();
    private setAdaptiveWindow;
    add(vid: string, config: CameraConfigAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
