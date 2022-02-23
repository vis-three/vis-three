import { Camera, Object3D, Scene, Vector3 } from "three";
import { SetSizeEvent } from "../../engine/ModelingEngine/ModelingEngine";
import { ModelingEngine } from "../../main";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { CameraConfigAllType } from "./CameraConfig";
export interface CameraCompilerTarget extends CompilerTarget {
    [key: string]: CameraConfigAllType;
}
export interface CameraCompilerParameters {
    scene?: Scene;
    target?: CameraCompilerTarget;
    engine?: ModelingEngine;
}
export interface CameraUserData {
    lookAtTarget?: Vector3;
    updateMatrixWorldFun?: (focus: boolean) => void;
    setSizeFun?: (event: SetSizeEvent) => void;
}
export declare class CameraCompiler extends Compiler implements ObjectCompiler {
    private target;
    private scene;
    private engine;
    private map;
    private constructMap;
    private objectMapSet;
    constructor(parameters?: CameraCompilerParameters);
    private setLookAt;
    private setAdaptiveWindow;
    linkObjectMap(map: Map<SymbolConfig['vid'], Object3D>): this;
    add(vid: string, config: CameraConfigAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(): void;
    setEngine(engine: ModelingEngine): this;
    setScene(scene: Scene): this;
    setTarget(target: CameraCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Camera>;
    compileAll(): this;
    dispose(): this;
}
