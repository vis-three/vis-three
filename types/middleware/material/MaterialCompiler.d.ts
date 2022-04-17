import { Material, Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { SymbolConfig } from "../common/CommonConfig";
import { MaterialAllType } from "./MaterialConfig";
export interface MaterialCompilerTarget extends CompilerTarget {
    [key: string]: MaterialAllType;
}
export interface MaterialCompilerParameters {
    target: MaterialCompilerTarget;
}
export declare class MaterialCompiler extends Compiler {
    private target;
    private map;
    private constructMap;
    private mapAttribute;
    private colorAttribute;
    private texturelMap;
    private resourceMap;
    private cachaColor;
    constructor(parameters?: MaterialCompilerParameters);
    private getTexture;
    linkRescourceMap(map: Map<string, unknown>): this;
    linkTextureMap(textureMap: Map<SymbolConfig["vid"], Texture>): this;
    add(vid: string, config: MaterialAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    getMap(): Map<SymbolConfig["vid"], Material>;
    setTarget(target: MaterialCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
}
