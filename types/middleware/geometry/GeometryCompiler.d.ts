import { BufferGeometry } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { GeometryAllType } from "./GeometryConfig";
import { EngineSupport } from "../../main";
export interface GeometryCompilerTarget extends CompilerTarget {
    [key: string]: GeometryAllType;
}
export interface GeometryCompilerParameters {
    target?: GeometryCompilerTarget;
}
export declare class GeometryCompiler extends Compiler {
    static transfromAnchor: (geometry: BufferGeometry, config: GeometryAllType) => BufferGeometry;
    private target;
    private map;
    private constructMap;
    private resourceMap;
    private replaceGeometry;
    constructor(parameters?: GeometryCompilerParameters);
    linkRescourceMap(map: Map<string, unknown>): this;
    private getRescource;
    private getGeometry;
    getMap(): Map<SymbolConfig["vid"], BufferGeometry>;
    useEngine(engine: EngineSupport): this;
    setTarget(target: GeometryCompilerTarget): this;
    add(vid: string, config: GeometryAllType): this;
    set(vid: string, path: string[], value: any): this;
    remove(vid: string): this;
    compileAll(): this;
    dispose(): this;
}
