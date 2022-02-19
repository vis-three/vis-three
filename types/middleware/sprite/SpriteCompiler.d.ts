import { Material, Sprite } from "three";
import { Compiler, CompilerTarget, ObjectCompiler } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { SpriteConfig } from "./SpriteConfig";
export interface SpriteCompilerTarget extends CompilerTarget {
    [key: string]: SpriteConfig;
}
export interface SpriteCompilerParameters {
    target: SpriteCompilerTarget;
}
export declare class SpriteCompiler extends Compiler implements ObjectCompiler {
    private target;
    private map;
    private weakMap;
    private materialMap;
    constructor(parametes?: SpriteCompilerParameters);
    private getReplaceMaterial;
    private getMaterial;
    private replaceGeometry;
    linkMaterialMap(materialMap: Map<string, Material>): this;
    getSupportVid(object: Sprite): SymbolConfig['vid'] | null;
    add(vid: string, config: SpriteConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(): void;
    setTarget(target: SpriteCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
