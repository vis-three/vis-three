import { BufferGeometry, Sprite, SpriteMaterial } from "three";
import { SolidObjectCompiler, SolidObjectCompilerParameters, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { SpriteConfig } from "./SpriteConfig";
export interface SpriteCompilerTarget extends SolidObjectCompilerTarget<SpriteConfig> {
    [key: string]: SpriteConfig;
}
export declare type SpriteCompilerParameters = SolidObjectCompilerParameters<SpriteConfig, SpriteCompilerTarget>;
export declare class SpriteCompiler extends SolidObjectCompiler<SpriteConfig, SpriteCompilerTarget, Sprite> {
    COMPILER_NAME: string;
    private replaceMaterial;
    private replaceGeometry;
    constructor(parametes?: SpriteCompilerParameters);
    getReplaceMaterial(): SpriteMaterial;
    getReplaceGeometry(): BufferGeometry;
    /**
     * @override
     */
    protected setLookAt(vid: string, target: string): this;
    /**
     * @override
     */
    protected getMaterial(vid: string): SpriteMaterial;
    add(vid: string, config: SpriteConfig): this;
    dispose(): this;
}
