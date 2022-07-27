import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { CompilerTarget } from "../core/Compiler";
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
export interface LoadOptions {
    [MODULETYPE.TEXTURE]?: CompilerTarget<TextureAllType>;
    [MODULETYPE.MATERIAL]?: CompilerTarget<MaterialAllType>;
    [MODULETYPE.GEOMETRY]?: CompilerTarget<GeometryAllType>;
    [MODULETYPE.LIGHT]?: CompilerTarget<LightConfigAllType>;
    [MODULETYPE.CAMERA]?: CompilerTarget<CameraConfigAllType>;
    [MODULETYPE.SPRITE]?: CompilerTarget<SpriteConfig>;
    [MODULETYPE.LINE]?: CompilerTarget<LineConfig>;
    [MODULETYPE.MESH]?: CompilerTarget<MeshConfig>;
    [MODULETYPE.POINTS]?: CompilerTarget<PointsConfig>;
    [MODULETYPE.GROUP]?: CompilerTarget<GroupConfig>;
    [MODULETYPE.CSS3D]?: CompilerTarget<CSS3DAllType>;
    [MODULETYPE.RENDERER]?: CompilerTarget<RendererConfigAllType>;
    [MODULETYPE.SCENE]?: CompilerTarget<SceneConfig>;
    [MODULETYPE.PASS]?: CompilerTarget<PassConfigAllType>;
    [MODULETYPE.CONTROLS]?: CompilerTarget<ControlsAllConfig>;
    [MODULETYPE.ANIMATION]?: CompilerTarget<AnimationAllType>;
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
    css3DDataSupport?: CSS3DDataSupport;
    passDataSupport?: PassDataSupport;
    animationDataSupport?: AnimationDataSupport;
}
export declare class DataSupportManager {
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
    getSupportData(type: MODULETYPE): CompilerTarget<SymbolConfig> | null;
    /**
     * @experimental 设置该模块下的响应式数据对象
     */
    setSupportData(type: MODULETYPE, data: CompilerTarget<SymbolConfig>): this;
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
