import { Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { TextureAllType } from "./TextureConfig";
import { EngineSupport } from "../../engine/EngineSupport";
export interface TextureCompilerTarget extends CompilerTarget {
    [key: string]: TextureAllType;
}
export interface TextureCompilerParameters {
    target: TextureCompilerTarget;
}
export declare class TextureCompiler extends Compiler {
    private target;
    private map;
    private constructMap;
    private resourceMap;
    constructor(parameters?: TextureCompilerParameters);
    private getResource;
    linkRescourceMap(map: Map<string, unknown>): this;
    add(vid: string, config: TextureAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    getMap(): Map<SymbolConfig["type"], Texture>;
    setTarget(target: TextureCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
}
