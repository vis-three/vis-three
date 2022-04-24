import { Material, Object3D, Texture } from "three";
import { EngineSupport } from "../engine/EngineSupport";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { GroupCompiler } from "../middleware/group/GroupCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LineCompiler } from "../middleware/line/LineCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { MeshCompiler } from "../middleware/mesh/MeshCompiler";
import { BasicObjectCompiler } from "../middleware/object/ObjectCompiler";
import { PassCompiler } from "../middleware/pass/PassCompiler";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/renderer/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
export interface CompilerManagerParameters {
    cameraCompiler: CameraCompiler;
    lightCompiler: LightCompiler;
    geometryCompiler: GeometryCompiler;
    textureCompiler: TextureCompiler;
    materialCompiler: MaterialCompiler;
    rendererCompiler: RendererCompiler;
    sceneCompiler: SceneCompiler;
    controlsCompiler: ControlsCompiler;
    spriteCompiler: SpriteCompiler;
    lineCompiler: LineCompiler;
    meshCompiler: MeshCompiler;
    pointsCompiler: PointsCompiler;
    groupCompiler: GroupCompiler;
    passCompiler: PassCompiler;
}
export declare class CompilerManager {
    private cameraCompiler;
    private lightCompiler;
    private geometryCompiler;
    private textureCompiler;
    private materialCompiler;
    private rendererCompiler;
    private sceneCompiler;
    private controlsCompiler;
    private spriteCompiler;
    private lineCompiler;
    private meshCompiler;
    private pointsCompiler;
    private groupCompiler;
    private passCompiler;
    private objectCompilerList;
    constructor(parameters?: CompilerManagerParameters);
    /**
     * engine进行编译器链接
     * @param engine EngineSupport
     * @returns this
     */
    support(engine: EngineSupport): this;
    /**
     * 获取该three物体的vid标识
     * @param object three object
     * @returns vid or null
     */
    getObjectSymbol<O extends Object3D>(object: O): SymbolConfig["vid"] | null;
    /**
     * 通过vid标识获取相应的three对象
     * @param vid vid标识
     * @returns object3D || null
     */
    getObjectBySymbol(vid: string): Object3D | null;
    /**
     * @deprecated
     */
    getMaterial(vid: string): Material | undefined;
    /**
     * @deprecated
     */
    getTexture(vid: string): Texture | undefined;
    /**
     * @deprecated
     * @returns
     */
    getObjectCompilerList(): BasicObjectCompiler[];
    dispose(): this;
}
