import { BufferGeometry } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { GeometryAllType, GeometryGroup } from "./GeometryConfig";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface GeometryCompilerTarget extends CompilerTarget {
    [key: string]: GeometryAllType;
}
export declare class GeometryCompiler extends Compiler {
    static transfromAnchor: (geometry: BufferGeometry, config: GeometryAllType) => BufferGeometry;
    MODULE: MODULETYPE;
    private target;
    private map;
    private weakMap;
    private constructMap;
    private resourceMap;
    private replaceGeometry;
    constructor();
    linkRescourceMap(map: Map<string, unknown>): this;
    private getRescource;
    private getGeometry;
    getMap(): Map<SymbolConfig["vid"], BufferGeometry>;
    useEngine(engine: EngineSupport): this;
    setTarget(target: GeometryCompilerTarget): this;
    add(vid: string, config: GeometryAllType): this;
    addGroup(vid: string, group: GeometryGroup): this;
    updateGroup(vid: string, index: number): this;
    removeGroup(vid: string, index: number): this;
    set(vid: string, path: string[], value: any): this;
    remove(vid: string): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(texture: BufferGeometry): string | null;
    getObjectBySymbol(vid: string): BufferGeometry | null;
}
