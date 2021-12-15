import { BufferGeometry, Material, Object3D, Scene } from "three";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { ModelConfig } from "./ModelConfig";
export interface ModelCompilerTarget extends CompilerTarget {
    [key: string]: ModelConfig;
}
export interface ModelCompilerParameters {
    scene?: Scene;
    target?: ModelCompilerTarget;
    geometryMap?: Map<SymbolConfig['vid'], BufferGeometry>;
    materialMap?: Map<SymbolConfig['vid'], Material>;
}
export declare class ModelCompiler extends Compiler {
    private scene;
    private target;
    private map;
    private constructMap;
    private geometryMap;
    private materialMap;
    private getReplaceMaterial;
    private getReplaceGeometry;
    constructor(parameters?: ModelCompilerParameters);
    add(vid: string, config: ModelConfig): this;
    set(path: string[], key: string, value: any): void;
    private getMaterial;
    private getGeometry;
    linkGeometryMap(map: Map<SymbolConfig['vid'], BufferGeometry>): this;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    setScene(scene: Scene): this;
    setTarget(target: ModelCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Object3D>;
    compileAll(): this;
    dispose(): this;
}
