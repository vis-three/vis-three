import { BufferGeometry, Material, Object3D, Texture } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { BasicCompiler, Compiler } from "../core/Compiler";
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
import { ObjectCompiler } from "../middleware/object/ObjectCompiler";
import { Object3DCompiler } from "../middleware/object3D/Object3DCompiler";
import { PassCompiler } from "../middleware/pass/PassCompiler";
import { PointsCompiler } from "../middleware/points/PointsCompiler";
import { RendererCompiler } from "../middleware/renderer/RendererCompiler";
import { SceneCompiler } from "../middleware/scene/SceneCompiler";
import { SpriteCompiler } from "../middleware/sprite/SpriteCompiler";
import { TextureCompiler } from "../middleware/texture/TextureCompiler";
import { CSS2DCompiler } from "../middleware/css2D/CSS2DCompiler";

export interface CompilerManagerParameters {
  object3DCompiler: Object3DCompiler;
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
  css2DCompiler: CSS2DCompiler;
}

export class CompilerManager extends EventDispatcher {
  object3DCompiler = new Object3DCompiler();
  cameraCompiler = new CameraCompiler();
  lightCompiler = new LightCompiler();
  geometryCompiler = new GeometryCompiler();
  textureCompiler = new TextureCompiler();
  materialCompiler = new MaterialCompiler();
  rendererCompiler = new RendererCompiler();
  sceneCompiler = new SceneCompiler();
  controlsCompiler = new ControlsCompiler();
  spriteCompiler = new SpriteCompiler();
  lineCompiler = new LineCompiler();
  meshCompiler = new MeshCompiler();
  pointsCompiler = new PointsCompiler();
  groupCompiler = new GroupCompiler();
  css3DCompiler = new CSS3DCompiler();
  css2DCompiler = new CSS2DCompiler();
  passCompiler = new PassCompiler();
  animationCompiler = new AnimationCompiler();

  private compilerMap: Map<MODULETYPE, BasicCompiler>;

  constructor(parameters?: CompilerManagerParameters) {
    super();
    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
      });
    }

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

    const dataSupportManager = engine.dataSupportManager!;

    for (const module of Object.values(MODULETYPE)) {
      dataSupportManager[`${module}DataSupport`].addCompiler(
        // @ts-ignore
        this[`${module}Compiler`]
      );
    }
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
    for (const compiler of this.compilerMap.values()) {
      if (compiler instanceof ObjectCompiler) {
        if (compiler.map.has(vid)) {
          return compiler.map.get(vid)! as O;
        }
      }
    }
    return null;
  }

  getGeometry<G extends BufferGeometry>(vid: string): G | null {
    return (this.geometryCompiler.map.get(vid) as G) || null;
  }

  getMaterial<M extends Material>(vid: string): M | null {
    return (this.materialCompiler.map.get(vid) as M) || null;
  }

  getTexture<T extends Texture>(vid: string): T | null {
    return (this.textureCompiler.map.get(vid) as T) || null;
  }

  dispose(): this {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
    }
    this.compilerMap.clear();
    return this;
  }
}
