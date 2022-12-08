import { BufferGeometry, Material, Object3D, Texture } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { EngineSupport } from "../engine/EngineSupport";
import { AnimationCompiler } from "../middleware/animation/AnimationCompiler";
import { CameraCompiler } from "../middleware/camera/CameraCompiler";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { ControlsCompiler } from "../middleware/controls/ControlsCompiler";
import { CSS3DCompiler } from "../middleware/css3D/CSS3DCompiler";
import { GeometryCompiler } from "../middleware/geometry/GeometryCompiler";
import { GroupCompiler } from "../middleware/group/GroupCompiler";
import { LightCompiler } from "../middleware/light/LightCompiler";
import { LineCompiler } from "../middleware/line/LineCompiler";
import { MaterialCompiler } from "../middleware/material/MaterialCompiler";
import { MeshCompiler } from "../middleware/mesh/MeshCompiler";
import { Object3DCompiler } from "../middleware/object3D/Object3DCompiler";
import { PassCompiler } from "../middleware/pass/PassCompiler";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/renderer/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
import { CSS2DCompiler } from "../middleware/css2D/CSS2DCompiler";
export interface CompilerManagerParameters {
    object3DCompiler: Object3DCompiler;
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
    animationCompiler: AnimationCompiler;
    css3DCompiler: CSS3DCompiler;
    css2DCompiler: CSS2DCompiler;
}
export declare class CompilerManager extends EventDispatcher {
    object3DCompiler: Object3DCompiler;
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
    css3DCompiler: CSS3DCompiler;
    css2DCompiler: CSS2DCompiler;
    passCompiler: PassCompiler;
    animationCompiler: AnimationCompiler;
    private compilerMap;
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
     * @returns three object || null
     */
    getObjectBySymbol(vid: string): any | null;
    /**
     * 通过vid获取object3D对象
     * @param vid 物体vid标识
     * @returns Object3D | null
     */
    getObject3D<O extends Object3D>(vid: string): O | null;
    getGeometry<G extends BufferGeometry>(vid: string): G | null;
    getMaterial<M extends Material>(vid: string): M | null;
    getTexture<T extends Texture>(vid: string): T | null;
    dispose(): this;
}
