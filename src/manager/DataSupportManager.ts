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
import { Rule } from "../core/Rule";
import {
  ObjectCompiler,
  ObjectCompilerTarget,
} from "../middleware/object/ObjectCompiler";
import { ObjectConfig } from "../middleware/object/ObjectConfig";
import { Object3D } from "three";
import { validate } from "uuid";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { GroupCompilerTarget } from "../middleware/group/GroupCompiler";
import { GroupDataSupport } from "../middleware/group/GroupDataSupport";
import { stringify } from "../convenient/JSONHandler";

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
}

export class DataSupportManager {
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
   * @deprecated - 下版本废弃
   *
   */
  getObjectDataSupportList(): BasicObjectDataSupport[] {
    return [];
  }

  /**
   *
   * @deprecated - 下版本废弃
   *
   */
  getObjectConfig<T extends SymbolConfig>(vid: string): T | null {
    return null;
  }

  getDataSupport<D>(type: MODULETYPE): D | null {
    if (this.dataSupportMap.has(type)) {
      return this.dataSupportMap.get(type)! as unknown as D;
    } else {
      console.warn(`can not found this type in dataSupportManager: ${type}`);
      return null;
    }
  }

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

  removeConfigBySymbol(vid: string) {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        dataSupport.removeConfig(vid);
        return;
      }
    }
  }

  getModuleBySymbol(vid: string): MODULETYPE | null {
    const dataSupportList = this.dataSupportMap.values();

    for (const dataSupport of dataSupportList) {
      if (dataSupport.existSymbol(vid)) {
        return dataSupport.MODULE;
      }
    }

    return null;
  }

  load(config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.load(config[module]!);
    });
    return this;
  }

  remove(config: LoadOptions): this {
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      config[module] && dataSupport.remove(config[module]!);
    });
    return this;
  }

  toJSON(extendsConfig?: object): string {
    const jsonObject = extendsConfig || {};
    const dataSupportMap = this.dataSupportMap;
    dataSupportMap.forEach((dataSupport, module) => {
      jsonObject[module] = dataSupport.getData();
    });

    return JSON.stringify(jsonObject, stringify);
  }
}
