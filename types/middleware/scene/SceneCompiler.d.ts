import { Scene, Texture } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
import { SceneConfig } from "./SceneConfig";
export interface SceneCompilerTarget extends CompilerTarget {
    [CONFIGTYPE.SCENE]: SceneConfig;
}
export interface SceneCompilerParameters {
    target?: SceneCompilerTarget;
    scene?: Scene;
}
export declare class SceneCompiler extends Compiler {
    private textureMap;
    private target;
    private scene;
    private fogCache;
    constructor(parameters?: SceneCompilerParameters);
    private background;
    private environment;
    private fog;
    linkTextureMap(map: Map<SymbolConfig['type'], Texture>): this;
    set(path: string[], key: string, value: any): this;
    setTarget(target: SceneCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
