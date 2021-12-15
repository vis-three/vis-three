import { Camera, Scene } from "three";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { CameraAllType } from "./CameraConfig";
export interface CameraCompilerTarget extends CompilerTarget {
    [key: string]: CameraAllType;
}
export interface CameraCompilerParameters {
    scene?: Scene;
    target?: CameraCompilerTarget;
}
export declare class CameraCompiler extends Compiler {
    private target;
    private scene;
    private map;
    private constructMap;
    constructor(parameters?: CameraCompilerParameters);
    add(vid: string, config: CameraAllType): this;
    set(path: string[], key: string, value: any): void;
    setScene(scene: Scene): this;
    setTarget(target: CameraCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Camera>;
    compileAll(): this;
    dispose(): this;
}
