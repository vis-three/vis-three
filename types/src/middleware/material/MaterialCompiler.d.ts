import { Material, Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { SymbolConfig } from "../common/CommonConfig";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialAllType } from "./MaterialConfig";
export interface MaterialCompilerTarget extends CompilerTarget {
    [key: string]: MaterialAllType;
}
export declare class MaterialCompiler extends Compiler {
    MODULE: MODULETYPE;
    private target;
    private map;
    private weakMap;
    private constructMap;
    private mapAttribute;
    private colorAttribute;
    private shaderAttribute;
    private texturelMap;
    private resourceMap;
    private cachaColor;
    constructor();
    private mergeMaterial;
    private getTexture;
    linkRescourceMap(map: Map<string, unknown>): this;
    linkTextureMap(textureMap: Map<SymbolConfig["vid"], Texture>): this;
    add(vid: string, config: MaterialAllType): this;
    set(vid: string, path: string[], key: string, value: any): this;
    cover(vid: string, config: MaterialAllType): this;
    remove(vid: string): this;
    getMap(): Map<SymbolConfig["vid"], Material>;
    setTarget(target: MaterialCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(object: Material): string | null;
    getObjectBySymbol(vid: string): any | null;
}
