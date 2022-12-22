import { AnimationAllType, AnimationDataSupport } from "../../animation";
import { CameraConfigAllType, CameraDataSupport } from "../../camera";
import { getModule, SymbolConfig } from "../../common";
import { CONFIGTYPE, MODULETYPE } from "../../constants";
import { ControlsAllConfig, ControlsDataSupport } from "../../controls";
import { CSS2DAllType, CSS2DDataSupport } from "../../css2D";
import { CSS3DAllType, CSS3DDataSupport } from "../../css3D";
import { GeometryAllType, GeometryDataSupport } from "../../geometry";
import { GroupConfig, GroupDataSupport } from "../../group";
import { LightConfigAllType, LightDataSupport } from "../../light";
import { LineConfig, LineDataSupport } from "../../line";
import { MaterialAllType, MaterialDataSupport } from "../../material";
import { MeshConfig, MeshDataSupport } from "../../mesh";
import { BasicCompiler, DataSupport } from "../../module";
import { Object3DConfig, Object3DDataSupport } from "../../object3D";
import { PointsConfig, PointsDataSupport } from "../../points";
import { RendererConfigAllType, RendererDataSupport } from "../../renderer";
import { SceneConfig, SceneDataSupport } from "../../scene";
import { SpriteConfig, SpriteDataSupport } from "../../sprite";
import { TextureAllType, TextureDataSupport } from "../../texture";
import { JSONHandler } from "../../utils";

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
  animationDataSupport?: AnimationDataSupport;
}

export class DataSupportManager {
  dataSupportMap: Map<
    string,
    DataSupport<SymbolConfig, object, BasicCompiler>
  > = new Map();

  constructor(parameters?: DataSupportManagerParameters) {
    [
      new Object3DDataSupport(),
      new CameraDataSupport(),
      new LightDataSupport(),
      new GeometryDataSupport(),
      new TextureDataSupport(),
      new MaterialDataSupport(),
      new RendererDataSupport(),
      new SceneDataSupport(),
      new ControlsDataSupport(),
      new SpriteDataSupport(),
      new LineDataSupport(),
      new MeshDataSupport(),
      new PointsDataSupport(),
      new GroupDataSupport(),
      new CSS3DDataSupport(),
      new CSS2DDataSupport(),
      new AnimationDataSupport(),
    ].forEach((dataSupport) => {
      this.dataSupportMap.set(
        dataSupport.MODULE,
        dataSupport as unknown as DataSupport<
          SymbolConfig,
          object,
          BasicCompiler
        >
      );
    });

    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        if (this[key] !== undefined) {
          this[key] = parameters[key];
        }
      });
    }

    Object.keys(this).forEach((key) => {
      const dataSupport = this[key];
      if (dataSupport instanceof DataSupport) {
        this.dataSupportMap.set(dataSupport.MODULE, dataSupport);
      }
    });
  }

  /**
   * 编译器扩展
   * @param compiler
   */
  extend(dataSupport) {
    if (this.dataSupportMap.has(dataSupport.MODULE)) {
      console.warn(
        "dataSupport manager has exist this compiler, that will cover",
        dataSupport
      );
    }
    this.dataSupportMap.set(
      dataSupport.MODULE,
      dataSupport as DataSupport<SymbolConfig, object, BasicCompiler>
    );
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
