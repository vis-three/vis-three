import { BufferGeometry, Material, Object3D, Scene, Vector3 } from "three";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { ModelConfig } from "./ModelConfig";
export interface ModelCompilerTarget extends CompilerTarget {
    [key: string]: ModelConfig;
}
export interface ModelUserData {
    lookAtTarget: Vector3 | null;
    updateMatrixWorldFun: ((focus: boolean) => void) | null;
}
export interface ModelCompilerParameters {
    scene?: Scene;
    target?: ModelCompilerTarget;
    geometryMap?: Map<SymbolConfig['vid'], BufferGeometry>;
    materialMap?: Map<SymbolConfig['vid'], Material>;
}
export declare class ModelCompiler extends Compiler implements ObjectCompiler {
    IS_OBJECTCOMPILER: boolean;
    private scene;
    private target;
    private map;
    private weakMap;
    private constructMap;
    private geometryMap;
    private materialMap;
    private objectMapSet;
    private getReplaceMaterial;
    private getReplaceGeometry;
    constructor(parameters?: ModelCompilerParameters);
    private getMaterial;
    private getGeometry;
    private setLookAt;
    private setMaterial;
    getSupportVid(object: Object3D): SymbolConfig['vid'] | null;
    add(vid: string, config: ModelConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(): void;
    linkGeometryMap(map: Map<SymbolConfig['vid'], BufferGeometry>): this;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    linkObjectMap(map: Map<SymbolConfig['vid'], Object3D>): this;
    setScene(scene: Scene): this;
    setTarget(target: ModelCompilerTarget): this;
    getMap(): Map<SymbolConfig['type'], Object3D>;
    compileAll(): this;
    dispose(): this;
}
