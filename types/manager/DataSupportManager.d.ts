import { DataSupport } from './../core/DataSupport';
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { ModelDataSupport } from "../middleware/model/ModelDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler";
import { ModelCompilerTarget } from "../middleware/model/ModelCompiler";
import { LightCompilerTarget } from "../middleware/light/LightCompiler";
import { GeometryCompilerTarget } from "../middleware/geometry/GeometryCompiler";
import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler";
import { MaterialCompilerTarget } from "../middleware/material/MaterialCompiler";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererCompilerTarget } from "../middleware/render/RendererCompiler";
import { RendererDataSupport } from "../middleware/render/RendererDataSupport";
import { SceneCompilerTarget } from "../middleware/scene/SceneCompiler";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsCompilerTarget } from "../middleware/controls/ControlsCompiler";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { Compiler, CompilerTarget } from "../core/Compiler";
import { SpriteCompilerTarget } from '../middleware/sprite/SpriteCompiler';
import { SpriteDataSupport } from '../middleware/sprite/SpriteDataSupport';
export interface LoadOptions {
    [MODULETYPE.TEXTURE]?: TextureCompilerTarget;
    [MODULETYPE.MATERIAL]?: MaterialCompilerTarget;
    [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget;
    [MODULETYPE.LIGHT]?: LightCompilerTarget;
    [MODULETYPE.MODEL]?: ModelCompilerTarget;
    [MODULETYPE.CAMERA]?: CameraCompilerTarget;
    [MODULETYPE.SPRITE]?: SpriteCompilerTarget;
    [MODULETYPE.RENDERER]?: RendererCompilerTarget;
    [MODULETYPE.SCENE]?: SceneCompilerTarget;
    [MODULETYPE.CONTROLS]?: ControlsCompilerTarget;
}
export interface DataSupportManagerParameters {
    cameraDataSupport: CameraDataSupport;
    lightDataSupport: LightDataSupport;
    geometryDataSupport: GeometryDataSupport;
    modelDataSupport: ModelDataSupport;
    textureDataSupport: TextureDataSupport;
    materialDataSupport: MaterialDataSupport;
    rendererDataSupport: RendererDataSupport;
    sceneDataSupport: SceneDataSupport;
    controlsDataSupport: ControlsDataSupport;
    spriteDataSupport: SpriteDataSupport;
}
export declare class DataSupportManager {
    private cameraDataSupport;
    private lightDataSupport;
    private geometryDataSupport;
    private modelDataSupport;
    private textureDataSupport;
    private materialDataSupport;
    private rendererDataSupport;
    private sceneDataSupport;
    private controlsDataSupport;
    private spriteDataSupport;
    private dataSupportMap;
    constructor(parameters?: DataSupportManagerParameters);
    getDataSupport<D>(type: MODULETYPE): D | null;
    getSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>>(type: MODULETYPE): C | null;
    setSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>>(type: MODULETYPE, data: C): this;
    load(config: LoadOptions): this;
    toJSON(): string;
}
