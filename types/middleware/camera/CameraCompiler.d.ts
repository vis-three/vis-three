import { BufferGeometry, Camera, Material, Vector3 } from "three";
import { SetSizeEvent } from "../../plugins/WebGLRendererPlugin";
import { CameraConfigAllType } from "./CameraConfig";
import { Engine } from "../../engine/Engine";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
export interface CameraCompilerTarget extends ObjectCompilerTarget<CameraConfigAllType> {
    [key: string]: CameraConfigAllType;
}
export interface CameraCompilerParameters extends ObjectCompilerParameters<CameraConfigAllType, CameraCompilerTarget> {
    engine: Engine;
}
export interface CacheCameraData {
    lookAtTarget?: Vector3;
    updateMatrixWorldFun?: (focus: boolean) => void;
    setSizeFun?: (event: SetSizeEvent) => void;
}
export declare class CameraCompiler extends ObjectCompiler<CameraConfigAllType, CameraCompilerTarget, Camera> {
    COMPILER_NAME: string;
    private engine;
    private constructMap;
    private filterAttribute;
    private cacheCameraMap;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parameters?: CameraCompilerParameters);
    getReplaceMaterial(): Material;
    getReplaceGeometry(): BufferGeometry;
    private setAdaptiveWindow;
    add(vid: string, config: CameraConfigAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    setEngine(engine: Engine): this;
    dispose(): this;
}
