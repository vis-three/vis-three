import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { PassDataSupport } from "../middleware/pass/PassDataSupport";
import { AnimationDataSupport } from "../middleware/animation/AnimationDataSupport";
import { CSS3DDataSupport } from "../middleware/css3D/CSS3DDataSupport";
import { TextureAllType } from "../middleware/texture/TextureConfig";
import { MaterialAllType } from "../middleware/material/MaterialConfig";
import { GeometryAllType } from "../middleware/geometry/GeometryInterface";
import { LightConfigAllType } from "../middleware/light/LightConfig";
import { CameraConfigAllType } from "../middleware/camera/CameraConfig";
import { SpriteConfig } from "../middleware/sprite/SpriteConfig";
import { LineConfig } from "../middleware/line/LineConfig";
import { MeshConfig } from "../middleware/mesh/MeshConfig";
import { PointsConfig } from "../middleware/points/PointsConfig";
import { GroupConfig } from "../middleware/group/GroupConfig";
import { CSS3DAllType } from "../middleware/css3D/CSS3DConfig";
import { RendererConfigAllType } from "../middleware/renderer/RendererConfig";
import { SceneConfig } from "../middleware/scene/SceneConfig";
import { PassConfigAllType } from "../middleware/pass/PassConfig";
import { ControlsAllConfig } from "../middleware/controls/ControlsConfig";
import { AnimationAllType } from "../middleware/animation/AnimationConfig";
import { Object3DConfig } from "../middleware/object3D/Object3DConfig";
import { Object3DDataSupport } from "../middleware/object3D/Object3DDataSupport";
import { CSS2DAllType } from "../middleware/css2D/CSS2DConfig";
import { CSS2DDataSupport } from "../middleware/css2D/CSS2DDataSupport";
export interface LoadOptions {
    [MODULETYPE.TEXTURE]?: Array<TextureAllType>;
    [MODULETYPE.MATERIAL]?: Array<MaterialAllType>;
    [MODULETYPE.GEOMETRY]?: Array<GeometryAllType>;
    [MODULETYPE.OBJECT3D]?: Array<Object3DConfig>;
    [MODULETYPE.LIGHT]?: Array<LightConfigAllType>;
    [MODULETYPE.CAMERA]?: Array<CameraConfigAllType>;
    [MODULETYPE.SPRITE]?: Array<SpriteConfig>;
    [MODULETYPE.LINE]?: Array<LineConfig>;
    [MODULETYPE.MESH]?: Array<MeshConfig>;
    [MODULETYPE.POINTS]?: Array<PointsConfig>;
    [MODULETYPE.GROUP]?: Array<GroupConfig>;
    [MODULETYPE.CSS3D]?: Array<CSS3DAllType>;
    [MODULETYPE.CSS2D]?: Array<CSS2DAllType>;
    [MODULETYPE.RENDERER]?: Array<RendererConfigAllType>;
    [MODULETYPE.SCENE]?: Array<SceneConfig>;
    [MODULETYPE.PASS]?: Array<PassConfigAllType>;
    [MODULETYPE.CONTROLS]?: Array<ControlsAllConfig>;
    [MODULETYPE.ANIMATION]?: Array<AnimationAllType>;
}
export interface DataSupportManagerParameters {
    object3DDataSupport?: Object3DDataSupport;
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
    css3DDataSupport?: CSS3DDataSupport;
    css2DDataSupport?: CSS2DDataSupport;
    passDataSupport?: PassDataSupport;
    animationDataSupport?: AnimationDataSupport;
}
export declare class DataSupportManager {
    object3DDataSupport: Object3DDataSupport;
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
    css3DDataSupport: CSS3DDataSupport;
    css2DDataSupport: CSS2DDataSupport;
    passDataSupport: PassDataSupport;
    animationDataSupport: AnimationDataSupport;
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
    getSupportData(type: MODULETYPE): import("../core/Compiler").CompilerTarget<SymbolConfig> | null;
    /**
     * 通过vid标识获取相应配置对象
     * @param vid vid标识
     * @returns config || null
     */
    getConfigBySymbol<T extends SymbolConfig>(vid: string): T | null;
    /**
     * 通过vid标识移除相关配置对象
     * @param vid ...vid标识
     * @returns this
     */
    removeConfigBySymbol(...vids: string[]): this;
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
    applyConfig<T extends SymbolConfig>(...configs: T[]): this;
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
     * @param compress 是否压缩配置单 default true
     * @returns JSON string
     */
    toJSON(extendsConfig?: object, compress?: boolean): string;
    /**
     * 导出配置单
     * @param extendsConfig 拓展配置对象
     * @param compress 是否压缩配置单 default true
     * @returns LoadOptions
     */
    exportConfig(extendsConfig?: object, compress?: boolean): LoadOptions;
}
