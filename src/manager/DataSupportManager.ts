import { DataSupport } from "./../core/DataSupport";
import { TextureDataSupport } from "../middleware/texture/TextureDataSupport";
import { MaterialDataSupport } from "../middleware/material/MaterialDataSupport";
import { LightDataSupport } from "../middleware/light/LightDataSupport";
import { GeometryDataSupport } from "../middleware/geometry/GeometryDataSupport";
import { CameraDataSupport } from "../middleware/camera/CameraDataSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { RendererDataSupport } from "../middleware/renderer/RendererDataSupport";
import { SceneDataSupport } from "../middleware/scene/SceneDataSupport";
import { ControlsDataSupport } from "../middleware/controls/ControlsDataSupport";
import { BasicCompiler, CompilerTarget } from "../core/Compiler";
import { SpriteDataSupport } from "../middleware/sprite/SpriteDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { stringify } from "../convenient/JSONHandler";
import { PassDataSupport } from "../middleware/pass/PassDataSupport";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { AnimationDataSupport } from "../middleware/animation/AnimationDataSupport";
import { CSS3DDataSupport } from "../middleware/css3D/CSS3DDataSupport";
import { CONFIGTYPE } from "../middleware/constants/configType";
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

export interface LoadOptions {
  [MODULETYPE.TEXTURE]?: CompilerTarget<TextureAllType>;
  [MODULETYPE.MATERIAL]?: CompilerTarget<MaterialAllType>;
  [MODULETYPE.GEOMETRY]?: CompilerTarget<GeometryAllType>;

  [MODULETYPE.OBJECT3D]?: CompilerTarget<Object3DConfig>;
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
  passDataSupport?: PassDataSupport;
  animationDataSupport?: AnimationDataSupport;
}

export class DataSupportManager {
  object3DDataSupport = new Object3DDataSupport();
  cameraDataSupport = new CameraDataSupport();
  lightDataSupport = new LightDataSupport();
  geometryDataSupport = new GeometryDataSupport();
  textureDataSupport = new TextureDataSupport();
  materialDataSupport = new MaterialDataSupport();
  rendererDataSupport = new RendererDataSupport();
  sceneDataSupport = new SceneDataSupport();
  controlsDataSupport = new ControlsDataSupport();
  spriteDataSupport = new SpriteDataSupport();
  lineDataSupport = new LineDataSupport();
  meshDataSupport = new MeshDataSupport();
  pointsDataSupport = new PointsDataSupport();
  groupDataSupport = new GroupDataSupport();
  css3DDataSupport = new CSS3DDataSupport();
  passDataSupport = new PassDataSupport();
  animationDataSupport = new AnimationDataSupport();

  private dataSupportMap: Map<
    MODULETYPE,
    DataSupport<SymbolConfig, object, BasicCompiler>
  >;

  constructor(parameters?: DataSupportManagerParameters) {
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        if (this[key] !== undefined) {
          this[key] = parameters[key];
        }
      });
    }

    const dataSupportMap = new Map();

    Object.keys(this).forEach((key) => {
      const dataSupport = this[key];
      if (dataSupport instanceof DataSupport) {
        dataSupportMap.set(dataSupport.MODULE, dataSupport);
      }
    });

    this.dataSupportMap = dataSupportMap;
  }

  /**
   * 获取该模块下的支持插件
   * @param type MODULETYPE
   * @returns DataSupport
   */
  getDataSupport<D>(type: MODULETYPE): D | null {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type)! as unknown as D;
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }

  /**
   * @experimental 获取该模块下的响应式数据对象
   */
  getSupportData(type: MODULETYPE) {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type)!.getData();
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }

  /**
   * @experimental 设置该模块下的响应式数据对象
   */
  setSupportData(type: MODULETYPE, data: CompilerTarget<SymbolConfig>): this {
    if (this.dataSupportMap.has(type)) {
      this.dataSupportMap.get(type)!.setData(data);
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
    }
    return this;
  }
  /**
   * 通过vid标识获取相应配置对象
   * @param vid vid标识
   * @returns config || null
   */
  getConfigBySymbol<T extends SymbolConfig>(vid: string): T | null {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      const config = dataSupport.getConfig(vid) as T;
      if (config) {
        return config;
      }
    }

    return null;
  }

  /**
   * 通过vid标识移除相关配置对象
   * @param vid ...vid标识
   * @returns this
   */
  removeConfigBySymbol(...vids: string[]): this {
    const dataSupportList = this.dataSupportMap.values();

    for (const vid of vids) {
      for (const dataSupport of dataSupportList) {
        if (dataSupport.existSymbol(vid)) {
          dataSupport.removeConfig(vid);
          break;
        }
      }
    }

    return this;
  }

  /**
   * 通过vid标识获取该标识所处的模块
   * @param vid vid标识
   * @returns MODULETYPE || null
   */
  getModuleBySymbol(vid: string): MODULETYPE | null {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        return dataSupport.MODULE;
      }
    }

    return null;
  }

  /**
   * 应用配置对象
   * @param config vis相关配置对象
   * @returns this
   */
  applyConfig<T extends SymbolConfig>(...configs: T[]): this {
    for (const config of configs) {
      const module = getModule(config.type as CONFIGTYPE);

      if (module) {
        this.dataSupportMap.get(module as MODULETYPE)!.addConfig(config);
      } else {
        console.warn(
          `dataSupportManager can not found this config module: ${config.type}`
        );
      }
    }

    return this;
  }

  /**
   * 获取响应式配置对象
   * @param config vis相关配置对象
   * @returns config
   */
  reactiveConfig<T extends SymbolConfig>(config: T): T {
    const module = getModule(config.type as CONFIGTYPE);
    if (module) {
      return this.dataSupportMap
        .get(module as MODULETYPE)!
        .addConfig(config)
        .getConfig(config.vid) as T;
    } else {
      console.warn(
        `dataSupportManager can not found this config module: ${config.type}`
      );
      return config;
    }
  }

  /**
   * 根据配置单加载对象
   * @param config 符合vis配置选项的配置单对象
   * @returns this
   */
  load(config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module]!);
    });
    return this;
  }

  /**
   * 根据配置单移除相关对象
   * @param config  符合vis配置选项的配置单对象
   * @returns this
   */
  remove(config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.remove(config[module]!);
    });
    return this;
  }

  /**
   * 获取JSON化的配置单
   * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
   * @param compress 是否压缩配置单 default true
   * @returns JSON string
   */
  toJSON(extendsConfig: object = {}, compress = true): string {
    return JSON.stringify(
      this.exportConfig(extendsConfig, compress),
      stringify
    );
  }

  /**
   * 导出配置单
   * @param extendsConfig 拓展配置对象
   * @param compress 是否压缩配置单 default true
   * @returns LoadOptions
   */
  exportConfig(extendsConfig: object = {}, compress = true): LoadOptions {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      extendsConfig[module] = dataSupport.exportConfig(compress);
    });
    return extendsConfig;
  }
}
