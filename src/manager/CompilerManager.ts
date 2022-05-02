import { Material, Object3D, Texture } from "three";
import { validate } from "uuid";
import { Compiler } from "../core/Compiler";
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
import {
  BasicObjectCompiler,
  ObjectCompiler,
} from "../middleware/object/ObjectCompiler";
import { PassCompiler } from "../middleware/pass/PassCompiler";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/renderer/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { BasicSolidObjectCompiler } from "../middleware/solidObject/SolidObjectCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
import { isValidKey } from "../utils/utils";

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

export class CompilerManager {
  private cameraCompiler = new CameraCompiler();
  private lightCompiler = new LightCompiler();
  private geometryCompiler = new GeometryCompiler();
  private textureCompiler = new TextureCompiler();
  private materialCompiler = new MaterialCompiler();
  private rendererCompiler = new RendererCompiler();
  private sceneCompiler = new SceneCompiler();
  private controlsCompiler = new ControlsCompiler();
  private spriteCompiler = new SpriteCompiler();
  private lineCompiler = new LineCompiler();
  private meshCompiler = new MeshCompiler();
  private pointsCompiler = new PointsCompiler();
  private groupCompiler = new GroupCompiler();
  private passCompiler = new PassCompiler();

  private objectCompilerList: Array<BasicObjectCompiler>;

  constructor(parameters?: CompilerManagerParameters) {
    this.objectCompilerList = [];

    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
      });
    }
    // 建立编译器链接
    const textureMap = this.textureCompiler.getMap();

    // 贴图连接
    this.sceneCompiler.linkTextureMap(textureMap);
    this.materialCompiler.linkTextureMap(textureMap);

    // 物体几何连接，材质连接，物体连接
    const geometryMap = this.geometryCompiler.getMap();
    const materialMap = this.materialCompiler.getMap();

    this.objectCompilerList = Object.values(this).filter(
      (object) => object instanceof ObjectCompiler
    );
    const objectMapList = this.objectCompilerList.map((compiler) =>
      compiler.getMap()
    );

    for (const objectCompiler of this.objectCompilerList) {
      if (isValidKey("IS_SOLIDOBJECTCOMPILER", objectCompiler)) {
        (objectCompiler as BasicSolidObjectCompiler)
          .linkGeometryMap(geometryMap)
          .linkMaterialMap(materialMap);
      }
      objectCompiler.linkObjectMap(...objectMapList);
    }
  }

  /**
   * engine进行编译器链接
   * @param engine EngineSupport
   * @returns this
   */
  support(engine: EngineSupport): this {
    // 根据engine设置
    Object.values(this)
      .filter((object) => object instanceof Compiler)
      .forEach((compiler) => {
        compiler.useEngine(engine);
      });

    // 动态资源连接
    if (engine.resourceManager) {
      const resourceMap = engine.resourceManager!.resourceMap;

      this.textureCompiler.linkRescourceMap(resourceMap);
      this.geometryCompiler.linkRescourceMap(resourceMap);
    }

    const dataSupportManager = engine.dataSupportManager!;
    // 添加通知 TODO: 注意生命周期 lookAt group等
    dataSupportManager.textureDataSupport.addCompiler(this.textureCompiler);
    dataSupportManager.materialDataSupport.addCompiler(this.materialCompiler);
    dataSupportManager.geometryDataSupport.addCompiler(this.geometryCompiler);
    dataSupportManager.rendererDataSupport.addCompiler(this.rendererCompiler);
    dataSupportManager.controlsDataSupport.addCompiler(this.controlsCompiler);
    dataSupportManager.passDataSupport.addCompiler(this.passCompiler);

    dataSupportManager.cameraDataSupport.addCompiler(this.cameraCompiler);
    dataSupportManager.lightDataSupport.addCompiler(this.lightCompiler);
    dataSupportManager.spriteDataSupport.addCompiler(this.spriteCompiler);
    dataSupportManager.lineDataSupport.addCompiler(this.lineCompiler);
    dataSupportManager.meshDataSupport.addCompiler(this.meshCompiler);
    dataSupportManager.pointsDataSupport.addCompiler(this.pointsCompiler);
    dataSupportManager.groupDataSupport.addCompiler(this.groupCompiler);
    dataSupportManager.sceneDataSupport.addCompiler(this.sceneCompiler);

    return this;
  }

  /**
   * 获取该three物体的vid标识
   * @param object three object
   * @returns vid or null
   */
  getObjectSymbol<O extends Object3D>(object: O): SymbolConfig["vid"] | null {
    const objectCompilerList = this.objectCompilerList;

    for (const compiler of objectCompilerList) {
      const vid = compiler.getObjectSymbol(object);
      if (vid) {
        return vid;
      }
    }

    return null;
  }

  /**
   * 通过vid标识获取相应的three对象
   * @param vid vid标识
   * @returns object3D || null
   */
  getObjectBySymbol(vid: string): Object3D | null {
    const objectCompilerList = this.objectCompilerList;

    for (const compiler of objectCompilerList) {
      const object = compiler.getMap().get(vid);
      if (object) {
        return object;
      }
    }
    return null;
  }

  /**
   * @deprecated
   */
  getMaterial(vid: string): Material | undefined {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`);
      return undefined;
    }

    const materialCompiler = this.materialCompiler;
    return materialCompiler.getMap().get(vid);
  }

  /**
   * @deprecated
   */
  getTexture(vid: string): Texture | undefined {
    if (!validate(vid)) {
      console.warn(`compiler manager vid is illeage: ${vid}`);
      return undefined;
    }

    const textureCompiler = this.textureCompiler;
    return textureCompiler.getMap().get(vid);
  }

  /**
   * @deprecated
   * @returns
   */
  getObjectCompilerList(): BasicObjectCompiler[] {
    return this.objectCompilerList;
  }

  dispose(): this {
    Object.keys(this).forEach((key) => {
      if (this[key] instanceof Compiler) {
        this[key].dispose();
      }
    });
    this.objectCompilerList = [];
    return this;
  }
}
