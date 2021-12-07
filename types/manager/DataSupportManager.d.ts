import { TextureDataSupport } from "../case/texture/TextureDataSupport";
import { ModelDataSupport } from "../case/model/ModelDataSupport";
import { MaterialDataSupport } from "../case/material/MaterialDataSupport";
import { LightDataSupport } from "../case/light/LightDataSupport";
import { GeometryDataSupport } from "../case/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../case/camera/CameraDataSupport";
import { TextureCompilerTarget } from "../case/texture/TextureCompiler";
import { ModelCompilerTarget } from "../case/model/ModelCompiler";
import { LightCompilerTarget } from "../case/light/LightCompiler";
import { GeometryCompilerTarget } from "../case/geometry/GeometryCompiler";
import { CameraCompilerTarget } from "../case/camera/CameraCompiler";
import { MaterialCompilerTarget } from "../case/material/MaterialCompiler";
import { MODULETYPE } from "../case/constants/MODULETYPE";
import { RendererCompilerTarget } from "../case/render/RendererCompiler";
import { RendererDataSupport } from "../case/render/RendererDataSupport";
import { SceneCompilerTarget } from "../case/scene/SceneCompiler";
import { SceneDataSupport } from "../case/scene/SceneDataSupport";
export interface DataSupportManagerLoadOptions {
    [MODULETYPE.TEXTURE]?: TextureCompilerTarget;
    [MODULETYPE.MATERIAL]?: MaterialCompilerTarget;
    [MODULETYPE.LIGHT]?: LightCompilerTarget;
    [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget;
    [MODULETYPE.MODEL]?: ModelCompilerTarget;
    [MODULETYPE.CAMERA]?: CameraCompilerTarget;
    [MODULETYPE.RENDERER]?: RendererCompilerTarget;
    [MODULETYPE.SCENE]?: SceneCompilerTarget;
}
export declare type DataSupportAllType = CameraDataSupport | LightDataSupport | GeometryDataSupport | ModelDataSupport | TextureDataSupport | MaterialDataSupport | RendererDataSupport | SceneDataSupport;
export interface DataSupportManagerParameters {
    cameraDataSupport?: CameraDataSupport;
    lightDataSupport?: LightDataSupport;
    geometryDataSupport?: GeometryDataSupport;
    modelDataSupport?: ModelDataSupport;
    textureDataSupport?: TextureDataSupport;
    materialDataSupport?: MaterialDataSupport;
    rendererDataSupport?: RendererDataSupport;
    sceneDataSupport?: SceneDataSupport;
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
    private dataSupportMap;
    constructor(parameters?: DataSupportManagerParameters);
    getDataSupport(type: MODULETYPE): DataSupportAllType | null;
    load(config: DataSupportManagerLoadOptions): this;
    toJSON(): string;
}
