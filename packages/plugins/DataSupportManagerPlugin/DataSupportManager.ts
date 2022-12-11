import { DataSupport } from "@vis-three/core/dataSupport";
import { BasicCompiler } from "@vis-three/core/compiler";
import {
  AnimationAllType,
  AnimationDataSupport,
  CameraConfigAllType,
  CameraDataSupport,
  CONFIGTYPE,
  ControlsAllConfig,
  ControlsDataSupport,
  CSS2DAllType,
  CSS2DDataSupport,
  CSS3DAllType,
  CSS3DDataSupport,
  GeometryAllType,
  GeometryDataSupport,
  getModule,
  GroupConfig,
  GroupDataSupport,
  JSONHandler,
  LightConfigAllType,
  LightDataSupport,
  LineConfig,
  LineDataSupport,
  MaterialAllType,
  MaterialDataSupport,
  MeshConfig,
  MeshDataSupport,
  MODULETYPE,
  Object3DConfig,
  Object3DDataSupport,
  PassConfigAllType,
  PassDataSupport,
  PointsConfig,
  PointsDataSupport,
  RendererConfigAllType,
  RendererDataSupport,
  SceneConfig,
  SceneDataSupport,
  SpriteConfig,
  SpriteDataSupport,
  SymbolConfig,
  TextureAllType,
  TextureDataSupport,
} from "@vis-three/middleware";

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
  css2DDataSupport = new CSS2DDataSupport();
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
      JSONHandler.stringify
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
