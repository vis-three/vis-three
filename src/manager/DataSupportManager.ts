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
import { EventCompilerTarget } from "../middleware/event/EventCompiler";
import { EventDataSupport } from "../middleware/event/EventDataSupport";
import { LineDataSupport } from "../middleware/line/LineDataSupport";
import { MeshCompilerTarget } from "../middleware/mesh/MeshCompiler";
import { MeshDataSupport } from "../middleware/mesh/MeshDataSupport";
import { PointsCompilerTarget } from "../middleware/points/PointsCompiler";
import { PointsDataSupport } from "../middleware/points/PointsDataSupport";
import {
  BasicObjectDataSupport,
  ObjectDataSupport,
} from "../middleware/object/ObjectDataSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { GroupCompilerTarget } from "../middleware/group/GroupCompiler";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { stringify } from "../convenient/JSONHandler";
import { getConfigModuleMap } from "../utils/utils";
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
  [MODULETYPE.EVENT]?: EventCompilerTarget;
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
  eventDataSupport?: EventDataSupport;
  lineDataSupport?: LineDataSupport;
  meshDataSupport?: MeshDataSupport;
  pointsDataSupport?: PointsDataSupport;
  groupDataSupport?: GroupDataSupport;
  passDataSupport?: PassDataSupport;
}

export class DataSupportManager {
  static configModuleMap = getConfigModuleMap();

  cameraDataSupport: CameraDataSupport = new CameraDataSupport();
  lightDataSupport: LightDataSupport = new LightDataSupport();
  geometryDataSupport: GeometryDataSupport = new GeometryDataSupport();
  textureDataSupport: TextureDataSupport = new TextureDataSupport();
  materialDataSupport: MaterialDataSupport = new MaterialDataSupport();
  rendererDataSupport: RendererDataSupport = new RendererDataSupport();
  sceneDataSupport: SceneDataSupport = new SceneDataSupport();
  controlsDataSupport: ControlsDataSupport = new ControlsDataSupport();
  spriteDataSupport: SpriteDataSupport = new SpriteDataSupport();
  eventDataSupport: EventDataSupport = new EventDataSupport();
  lineDataSupport: LineDataSupport = new LineDataSupport();
  meshDataSupport: MeshDataSupport = new MeshDataSupport();
  pointsDataSupport: PointsDataSupport = new PointsDataSupport();
  groupDataSupport: GroupDataSupport = new GroupDataSupport();
  passDataSupport: PassDataSupport = new PassDataSupport();

  private dataSupportMap: Map<
    MODULETYPE,
    DataSupport<CompilerTarget, Compiler>
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
   *
   * @deprecated - 下版本废弃 不在单独区分object dataSupport
   *
   */
  getObjectDataSupportList(): BasicObjectDataSupport[] {
    return [];
  }

  /**
   *
   * @deprecated - 下版本废弃 -> getConfigBySymbol
   *
   */
  getObjectConfig<T extends SymbolConfig>(vid: string): T | null {
    return null;
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
  getSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>>(
    type: MODULETYPE
  ): C | null {
    if (this.dataSupportMap.has(type)) {
      return (this.dataSupportMap.get(type)! as unknown as D).getData();
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }

  /**
   * @experimental 设置该模块下的响应式数据对象
   */
  setSupportData<C extends CompilerTarget, D extends DataSupport<C, Compiler>>(
    type: MODULETYPE,
    data: C
  ): this {
    if (this.dataSupportMap.has(type)) {
      (this.dataSupportMap.get(type)! as unknown as D).setData(data);
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
   * @param vid vid标识
   * @returns void
   */
  removeConfigBySymbol(vid: string) {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        dataSupport.removeConfig(vid);
        return;
      }
    }
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
  applyConfig<T extends SymbolConfig>(config: T): this {
    const module = DataSupportManager.configModuleMap[config.type];

    if (module) {
      this.dataSupportMap.get(module as MODULETYPE)!.addConfig(config);
    } else {
      console.warn(
        `dataSupportManager can not found this config module: ${config.type}`
      );
    }

    return this;
  }
  /**
   * 获取响应式配置对象
   * @param config vis相关配置对象
   * @returns config
   */
  reactiveConfig<T extends SymbolConfig>(config: T): T {
    const module = DataSupportManager.configModuleMap[config.type];
    if (module) {
      return this.dataSupportMap
        .get(module as MODULETYPE)!
        .addConfig(config)
        .getConfig<T>(config.vid);
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
   * @returns JSON string
   */
  toJSON(extendsConfig?: object): string {
    const jsonObject = extendsConfig || {};
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      jsonObject[module] = dataSupport.getData();
    });

    return JSON.stringify(jsonObject, stringify);
  }
}
