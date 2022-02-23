import { Material, Object3D } from "three";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { Engine } from "../../main";
import { SymbolConfig } from "../common/CommonConfig";
import { LineAllType } from "./LineConfig";
export interface LineCompilerTarget extends CompilerTarget {
    [key: string]: LineAllType;
}
export interface LineCompilerParameters {
    target: LineCompilerTarget;
    engine: Engine;
}
export declare class LineCompiler extends Compiler implements ObjectCompiler {
    IS_OBJECTCOMPILER: boolean;
    private target;
    private scene;
    private engine;
    private map;
    private weakMap;
    private materialMap;
    private objectMapSet;
    private processorMap;
    constructor(parameters?: LineCompilerParameters);
    private getReplaceMaterial;
    getMaterial(vid: string): Material;
    getObject(vid: string): Object3D | null;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    linkObjectMap(map: Map<SymbolConfig['vid'], Object3D>): this;
    getSupportVid(object: Object3D): SymbolConfig['vid'] | null;
    add(vid: string, config: LineAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(): void;
    setTarget(target: LineCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Object3D>;
    compileAll(): this;
    dispose(): this;
}
