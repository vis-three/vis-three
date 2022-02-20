import { Material, Object3D, Texture } from "three";
import { Engine } from "../main";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { ModelCompiler } from "../middleware/model/ModelCompiler";
import { RendererCompiler } from "../middleware/render/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
export interface CompilerManagerParameters {
    cameraCompiler: CameraCompiler;
    lightCompiler: LightCompiler;
    geometryCompiler: GeometryCompiler;
    modelCompiler: ModelCompiler;
    textureCompiler: TextureCompiler;
    materialCompiler: MaterialCompiler;
    rendererCompiler: RendererCompiler;
    sceneCompiler: SceneCompiler;
    controlsCompiler: ControlsCompiler;
    spriteCompiler: SpriteCompiler;
}
export declare class CompilerManager {
    private cameraCompiler;
    private lightCompiler;
    private geometryCompiler;
    private modelCompiler;
    private textureCompiler;
    private materialCompiler;
    private rendererCompiler;
    private sceneCompiler;
    private controlsCompiler;
    private spriteCompiler;
    private objectCompilerList;
    constructor(parameters?: CompilerManagerParameters);
    support(engine: Engine): this;
    getObjectVid<O extends Object3D>(object: O): SymbolConfig['vid'] | null;
    getMaterial(vid: string): Material | undefined;
    getTexture(vid: string): Texture | undefined;
}
