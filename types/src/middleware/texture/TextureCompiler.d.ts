import { Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { TextureAllType } from "./TextureConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface TextureCompilerTarget extends CompilerTarget {
    [key: string]: TextureAllType;
}
export declare class TextureCompiler extends Compiler {
    private static replaceImage;
    MODULE: MODULETYPE;
    private target;
    private map;
    private weakMap;
    private constructMap;
    private resourceMap;
    constructor();
    private getResource;
    linkRescourceMap(map: Map<string, unknown>): this;
    add(vid: string, config: TextureAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(vid: string): this;
    getMap(): Map<SymbolConfig["vid"], Texture>;
    setTarget(target: TextureCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(texture: Texture): string | null;
    getObjectBySymbol(vid: string): Texture | null;
}
