import { EventDispatcher } from "@vis-three/core";
import { BufferGeometry, Material, Object3D, Texture } from "three";
import { AnimationCompiler } from "../../animation";
import { CameraCompiler } from "../../camera";
import { SymbolConfig } from "../../common";
import { MODULETYPE } from "../../constants";
import { ControlsCompiler } from "../../controls";
import { CSS2DCompiler } from "../../css2D";
import { CSS3DCompiler } from "../../css3D";
import { GeometryCompiler } from "../../geometry";
import { GroupCompiler } from "../../group";
import { LightCompiler } from "../../light";
import { LineCompiler } from "../../line";
import { MaterialCompiler } from "../../material";
import { MeshCompiler } from "../../mesh";
import { BasicCompiler } from "../../module";
import { ObjectCompiler } from "../../object/ObjectCompiler";
import { Object3DCompiler } from "../../object3D";
import { PointsCompiler } from "../../points";
import { RendererCompiler } from "../../renderer";
import { SceneCompiler } from "../../scene";
import { SpriteCompiler } from "../../sprite";
import { TextureCompiler } from "../../texture";

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
  animationCompiler: AnimationCompiler;
  css3DCompiler: CSS3DCompiler;
  css2DCompiler: CSS2DCompiler;
}

export class CompilerManager extends EventDispatcher {
  compilerMap: Map<string, BasicCompiler> = new Map();

  constructor(parameters?: CompilerManagerParameters) {
    super();
    [
      new Object3DCompiler(),
      new CameraCompiler(),
      new LightCompiler(),
      new GeometryCompiler(),
      new TextureCompiler(),
      new MaterialCompiler(),
      new RendererCompiler(),
      new SceneCompiler(),
      new ControlsCompiler(),
      new SpriteCompiler(),
      new LineCompiler(),
      new MeshCompiler(),
      new PointsCompiler(),
      new GroupCompiler(),
      new CSS3DCompiler(),
      new CSS2DCompiler(),
      new AnimationCompiler(),
    ].forEach((compiler) => {
      this.compilerMap.set(compiler.MODULE, compiler);
    });

    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this.compilerMap.set(parameters[key].MODULE, parameters[key]);
      });
    }
  }

  /**
   * 编译器扩展
   * @param compiler
   */
  extend(compiler) {
    if (this.compilerMap.has(compiler.MODULE)) {
      console.warn(
        "compiler manager has exist this compiler, that will cover",
        compiler
      );
    }
    this.compilerMap.set(compiler.MODULE, compiler as BasicCompiler);
  }

  getCompiler<D>(module: string) {
    if (this.compilerMap.has(module)) {
      return this.compilerMap.get(module)! as unknown as D;
    } else {
      console.warn(`can not found this type in compiler manager: ${module}`);
      return null;
    }
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

  getMaterial(vid: string) {
    const materialCompiler = this.compilerMap.get(MODULETYPE.MATERIAL)!;
    return materialCompiler.map.get(vid) as Material | null;
  }

  getTexture(vid: string) {
    const textureCompiler = this.compilerMap.get(MODULETYPE.TEXTURE)!;
    return textureCompiler.map.get(vid) as Texture | null;
  }

  dispose(): this {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
    }
    this.compilerMap.clear();
    return this;
  }
}
