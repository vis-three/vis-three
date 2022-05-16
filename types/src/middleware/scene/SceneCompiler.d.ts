import { Scene, Texture } from "three";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SceneConfig } from "./SceneConfig";
export interface SceneCompilerTarget extends ObjectCompilerTarget<SceneConfig> {
    [key: string]: SceneConfig;
}
export declare class SceneCompiler extends ObjectCompiler<SceneConfig, SceneCompilerTarget, Scene> {
    COMPILER_NAME: string;
    private textureMap;
    private fogCache;
    constructor();
    /**
     * @override
     */
    protected setLookAt(vid: string, target: string): this;
    private background;
    private environment;
    private fog;
    linkTextureMap(map: Map<SymbolConfig["type"], Texture>): this;
    add(vid: string, config: SceneConfig): this;
    cover(vid: string, config: SceneConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    setTarget(target: SceneCompilerTarget): this;
    dispose(): this;
}
