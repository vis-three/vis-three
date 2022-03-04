import { BufferGeometry, Sprite, SpriteMaterial } from "three";
import { ObjectCompiler, ObjectCompilerParameters, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
export interface SpriteCompilerTarget extends ObjectCompilerTarget<SpriteConfig> {
    [key: string]: SpriteConfig;
}
export interface SpriteCompilerParameters extends ObjectCompilerParameters<SpriteConfig, SpriteCompilerTarget> {
}
export declare class SpriteCompiler extends ObjectCompiler<SpriteConfig, SpriteCompilerTarget, Sprite> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parametes?: SpriteCompilerParameters);
    getReplaceMaterial(): SpriteMaterial;
    getReplaceGeometry(): BufferGeometry;
    private getSpriteMaterial;
    add(vid: string, config: SpriteConfig): this;
    set(vid: string, path: string[], key: string, value: any): this;
    dispose(): this;
}
