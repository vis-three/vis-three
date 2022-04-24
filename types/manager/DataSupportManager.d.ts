import { DataSupport } from "./../core/DataSupport";
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { TextureCompilerTarget } from "../middleware/texture/TextureCompiler";
import { LightCompilerTarget } from "../middleware/light/LightCompiler";
import { GeometryCompilerTarget } from "../middleware/geometry/GeometryCompiler";
import { CameraCompilerTarget } from "../middleware/camera/CameraCompiler";
import { MaterialCompilerTarget } from "../middleware/material/MaterialCompiler";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererCompilerTarget } from "../middleware/renderer/RendererCompiler";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneCompilerTarget } from "../middleware/scene/SceneCompiler";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsCompilerTarget } from "../middleware/controls/ControlsCompiler";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { Compiler, CompilerTarget } from "../core/Compiler";
import { SpriteCompilerTarget } from "../middleware/sprite/SpriteCompiler";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshCompilerTarget } from "../middleware/mesh/MeshCompiler";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsCompilerTarget } from "../middleware/points/PointsCompiler";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { GroupCompilerTarget } from "../middleware/group/GroupCompiler";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { PassCompilerTarget } from "../middleware/pass/PassCompiler";
import { PassDataSupport } from "../middleware/pass/PassDataSupport";
export interface LoadOptions {
    [MODULETYPE.TEXTURE]?: TextureCompilerTarget;
    [MODULETYPE.MATERIAL]?: MaterialCompilerTarget;
    [MODULETYPE.GEOMETRY]?: GeometryCompilerTarget;
    [MODULETYPE.LIGHT]?: LightCompilerTarget;
    [MODULETYPE.CAMERA]?: CameraCompilerTarget;
    [MODULETYPE.SPRITE]?: SpriteCompilerTarget;
    [MODULETYPE.LINE]?: LightCompilerTarget;
    [MODULETYPE.MESH]?: MeshCompilerTarget;
    [MODULETYPE.POINTS]?: PointsCompilerTarget;
    [MODULETYPE.GROUP]?: GroupCompilerTarget;
    [MODULETYPE.RENDERER]?: RendererCompilerTarget;
    [MODULETYPE.SCENE]?: SceneCompilerTarget;
    [MODULETYPE.PASS]?: PassCompilerTarget;
    [MODULETYPE.CONTROLS]?: ControlsCompilerTarget;
}
export interface DataSupportManagerParameters {
    cameraDataSupport?: CameraDataSupport;
    lightDataSupport?: LightDataSupport;
    geometryDataSupport?: GeometryDataSupport;
    textureDataSupport?: TextureDataSupport;
    materialDataSupport?: MaterialDataSupport;
    rendererDataSupport?: RendererDataSupport;
    sceneDataSupport?: SceneDataSupport;
    controlsDataSupport?: ControlsDataSupport;
    spriteDataSupport?: SpriteDataSupport;
    lineDataSupport?: LineDataSupport;
    meshDataSupport?: MeshDataSupport;
    pointsDataSupport?: PointsDataSupport;
    groupDataSupport?: GroupDataSupport;
    passDataSupport?: PassDataSupport;
}
export declare class DataSupportManager {
    static configModuleMap: {
        [key: string]: string;
    };
    cameraDataSupport: CameraDataSupport;
    lightDataSupport: LightDataSupport;
    geometryDataSupport: GeometryDataSupport;
    textureDataSupport: TextureDataSupport;
    materialDataSupport: MaterialDataSupport;
    rendererDataSupport: RendererDataSupport;
    sceneDataSupport: SceneDataSupport;
    controlsDataSupport: ControlsDataSupport;
    spriteDataSupport: SpriteDataSupport;
    lineDataSupport: LineDataSupport;
    meshDataSupport: MeshDataSupport;
    pointsDataSupport: PointsDataSupport;
    groupDataSupport: GroupDataSupport;
    passDataSupport: PassDataSupport;
    private dataSupportMap;
    constructor(parameters?: DataSupportManagerParameters);
    /**
     * 获取该模块下的支持插件
     * @param type MODULETYPE
     * @returns DataSupport
     */
    getDataSupport<D>(type: MODULETYPE): D | null;
    /**
     * @experimental 获取该模块下的响应式数据对象
     */
    getSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>>(type: MODULETYPE): C | null;
    /**
     * @experimental 设置该模块下的响应式数据对象
     */
    setSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>>(type: MODULETYPE, data: C): this;
    /**
     * 通过vid标识获取相应配置对象
     * @param vid vid标识
     * @returns config || null
     */
    getConfigBySymbol<T extends SymbolConfig>(vid: string): T | null;
    /**
     * 通过vid标识移除相关配置对象
     * @param vid vid标识
     * @returns void
     */
    removeConfigBySymbol(vid: string): void;
    /**
     * 通过vid标识获取该标识所处的模块
     * @param vid vid标识
     * @returns MODULETYPE || null
     */
    getModuleBySymbol(vid: string): MODULETYPE | null;
    /**
     * 应用配置对象
     * @param config vis相关配置对象
     * @returns this
     */
    applyConfig<T extends SymbolConfig>(config: T): this;
    /**
     * 获取响应式配置对象
     * @param config vis相关配置对象
     * @returns config
     */
    reactiveConfig<T extends SymbolConfig>(config: T): T;
    /**
     * 根据配置单加载对象
     * @param config 符合vis配置选项的配置单对象
     * @returns this
     */
    load(config: LoadOptions): this;
    /**
     * 根据配置单移除相关对象
     * @param config  符合vis配置选项的配置单对象
     * @returns this
     */
    remove(config: LoadOptions): this;
    /**
     * 获取JSON化的配置单
     * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
     * @returns JSON string
     */
    toJSON(extendsConfig?: object): string;
}
