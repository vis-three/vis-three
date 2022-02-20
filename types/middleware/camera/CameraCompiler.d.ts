import { Camera, Object3D, Scene, Vector3 } from "three";
import { ModelingEngine } from "../../main";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { SetSizeEvent } from "../../plugins/WebGLRendererPlugin";
import { SymbolConfig } from "../common/CommonConfig";
import { CameraAllType } from "./CameraConfig";
import { Engine } from "../../engine/Engine";
export interface CameraCompilerTarget extends CompilerTarget {
    [key: string]: CameraAllType;
}
export interface CameraCompilerParameters {
    scene?: Scene;
    target?: CameraCompilerTarget;
    engine?: Engine;
}
export interface CameraUserData {
    lookAtTarget?: Vector3;
    updateMatrixWorldFun?: (focus: boolean) => void;
    setSizeFun?: (event: SetSizeEvent) => void;
}
export declare class CameraCompiler extends Compiler implements ObjectCompiler {
    IS_OBJECTCOMPILER: boolean;
    private target;
    private scene;
    private engine;
    private map;
    private weakMap;
    private constructMap;
    private objectMapSet;
    constructor(parameters?: CameraCompilerParameters);
    private setLookAt;
    private setAdaptiveWindow;
    linkObjectMap(map: Map<SymbolConfig['vid'], Object3D>): this;
    getSupportVid(object: Camera): SymbolConfig['vid'] | null;
    add(vid: string, config: CameraAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(vid: string): void;
    setEngine(engine: ModelingEngine): this;
    setScene(scene: Scene): this;
    setTarget(target: CameraCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Camera>;
    compileAll(): this;
    dispose(): this;
}
