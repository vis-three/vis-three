import { Material, Object3D, Texture } from "three";
import { validate } from "uuid";
import { Compiler } from "../core/Compiler";
import { EngineSupport } from "../engine/EngineSupport";
import { MODULETYPE } from "../main";
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
  animationCompiler: AnimationCompiler;
  css3DCompiler: CSS3DCompiler;
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
  private css3DCompiler = new CSS3DCompiler();
  private passCompiler = new PassCompiler();
  private animationCompiler = new AnimationCompiler();

  private compilerMap: Map<MODULETYPE, Compiler>;

  private object3DMapSet: Set<Map<SymbolConfig["vid"], Object3D>> = new Set();

  constructor(parameters?: CompilerManagerParameters) {
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
    this.animationCompiler.linkTextureMap(textureMap);

    // 物体几何连接，材质连接，物体连接
    const geometryMap = this.geometryCompiler.getMap();
    const materialMap = this.materialCompiler.getMap();

    const objectCompilerList = Object.values(this).filter(
      (object) => object instanceof ObjectCompiler
    );
    // TODO: 编译器内部物体全部从compilerManager里面获取
    const objectMapList = objectCompilerList.map((compiler) => {
      const map = compiler.getMap();
      this.object3DMapSet.add(map);
      return map;
    });

    for (const objectCompiler of objectCompilerList) {
      if (isValidKey("IS_SOLIDOBJECTCOMPILER", objectCompiler)) {
        (objectCompiler as BasicSolidObjectCompiler)
          .linkGeometryMap(geometryMap)
          .linkMaterialMap(materialMap);
      }
      objectCompiler.linkObjectMap(...objectMapList);
    }

    this.animationCompiler
      .linkObjectMap(...objectMapList)
      .linkMaterialMap(materialMap);

    const compilerMap = new Map();

    Object.keys(this).forEach((key) => {
      const compiler = this[key];
      if (compiler instanceof Compiler) {
        compilerMap.set(compiler.MODULE, compiler);
      }
    });

    this.compilerMap = compilerMap;
  }

  /**
   * engine进行编译器链接
   * @param engine EngineSupport
   * @returns this
   */
  support(engine: EngineSupport): this {
    // 根据engine设置
    this.compilerMap.forEach((compiler) => {
      compiler.useEngine(engine);
    });

    // 动态资源连接
    if (engine.resourceManager) {
      const resourceMap = engine.resourceManager!.resourceMap;

      this.textureCompiler.linkRescourceMap(resourceMap);
      this.geometryCompiler.linkRescourceMap(resourceMap);
      this.css3DCompiler.linkRescourceMap(resourceMap);
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
    dataSupportManager.css3DDataSupport.addCompiler(this.css3DCompiler);
    dataSupportManager.groupDataSupport.addCompiler(this.groupCompiler);
    dataSupportManager.sceneDataSupport.addCompiler(this.sceneCompiler);
    dataSupportManager.animationDataSupport.addCompiler(this.animationCompiler);
    return this;
  }

  /**
   * 获取该three物体的vid标识
   * @param object three object
   * @returns vid or null
   */
  getObjectSymbol<O extends Object3D>(object: O): SymbolConfig["vid"] | null {
    for (const compiler of this.compilerMap.values()) {
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
   * @returns three object || null
   */
  getObjectBySymbol(vid: string): any | null {
    for (const compiler of this.compilerMap.values()) {
      const object = compiler.getObjectBySymbol(vid);
      if (object) {
        return object;
      }
    }
    return null;
  }

  /**
   * 通过vid获取object3D对象
   * @param vid 物体vid标识
   * @returns Object3D | null
   */
  getObject3D<O extends Object3D>(vid: string): O | null {
    for (const map of this.object3DMapSet) {
      if (map.has(vid)) {
        return map.get(vid)! as O;
      }
    }
    return null;
  }

  dispose(): this {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose({});
    }
    this.compilerMap.clear();
    return this;
  }
}
