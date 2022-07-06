import { Material, Object3D, Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../engine/EngineSupport";
import { SymbolConfig } from "../common/CommonConfig";
import { MODULETYPE } from "../constants/MODULETYPE";
import { AnimationAllType } from "./AnimationConfig";
export interface AnimationCompilerTarget extends CompilerTarget {
    [key: string]: AnimationAllType;
}
export declare class AnimationCompiler extends Compiler {
    MODULE: MODULETYPE;
    private target;
    private engine;
    private objectMapSet;
    private scriptAniSymbol;
    constructor();
    linkObjectMap(...map: Map<SymbolConfig["vid"], Object3D>[]): this;
    linkTextureMap(textureMap: Map<SymbolConfig["vid"], Texture>): this;
    linkMaterialMap(materialMap: Map<SymbolConfig["vid"], Material>): this;
    private getObject;
    add(vid: string, config: AnimationAllType): this;
    update(vid: string, path: string[], key: string, value: any): this;
    remove(config: AnimationAllType): this;
    setTarget(target: AnimationCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(parameter: unknown): this;
    getObjectSymbol(animation: any): string | null;
    getObjectBySymbol(vid: string): any | null;
}
