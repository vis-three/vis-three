import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsAllConfig } from "./ControlsConfig";
export declare type ControlsAllType = TransformControls | VisOrbitControls;
export interface ControlsCompilerTarget extends CompilerTarget {
    [key: string]: ControlsAllConfig;
}
export declare class ControlsCompiler extends Compiler {
    MODULE: MODULETYPE;
    private target;
    private map;
    private weakMap;
    private processorMap;
    constructor();
    private getAssembly;
    set(vid: string, path: string[], key: string, value: any): this;
    setAll(vid: string): this;
    setTarget(target: ControlsCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(texture: ControlsAllType): string | null;
    getObjectBySymbol(vid: string): ControlsAllType | null;
}
