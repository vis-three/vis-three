import {
  BufferGeometry,
  Camera,
  Material,
  OrthographicCamera,
  PerspectiveCamera,
  Scene,
  Vector3,
} from "three";
import { Compiler } from "../../core/Compiler";
import { SetSizeEvent } from "../../plugins/WebGLRendererPlugin";
import { CameraConfigAllType } from "./CameraConfig";
import { Engine, ENGINEPLUGIN } from "../../engine/Engine";
import {
  ObjectCompiler,
  ObjectCompilerParameters,
  ObjectCompilerTarget,
} from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";

export interface CameraCompilerTarget
  extends ObjectCompilerTarget<CameraConfigAllType> {
  [key: string]: CameraConfigAllType;
}

export interface CameraCompilerParameters
  extends ObjectCompilerParameters<CameraConfigAllType, CameraCompilerTarget> {
  engine: Engine;
}

export interface CacheCameraData {
  lookAtTarget?: Vector3;
  updateMatrixWorldFun?: (focus: boolean) => void;
  setSizeFun?: (event: SetSizeEvent) => void;
}

export class CameraCompiler extends ObjectCompiler<
  CameraConfigAllType,
  CameraCompilerTarget,
  Camera
> {
  COMPILER_NAME: string = MODULETYPE.CAMERA;

  private engine!: Engine;
  private constructMap: Map<string, () => Camera>;
  private filterAttribute: { [key: string]: boolean };
  private cacheCameraMap: WeakMap<Camera, CacheCameraData>;

  private replaceMaterial = new Material();
  private replaceGeometry = new BufferGeometry();

  constructor(parameters?: CameraCompilerParameters) {
    super(parameters);
    if (parameters) {
      parameters.engine && (this.engine = parameters.engine);
    } else {
      this.engine = new Engine().install(ENGINEPLUGIN.WEBGLRENDERER);
    }
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set(
      "OrthographicCamera",
      () => new OrthographicCamera(0, 0, 0, 0)
    );

    this.constructMap = constructMap;

    this.filterAttribute = {
      scale: true,
    };

    this.cacheCameraMap = new WeakMap();
  }

  getReplaceMaterial(): Material {
    console.warn(`CameraCompiler: can not use material in CameraCompiler.`);
    return this.replaceMaterial;
  }

  getReplaceGeometry(): BufferGeometry {
    console.warn(`CameraCompiler: can not use geometry in CameraCompiler.`);
    return this.replaceGeometry;
  }

  // 自适应窗口大小
  private setAdaptiveWindow(vid: string, value: boolean): this {
    if (!this.map.has(vid)) {
      console.warn(`camera compiler can not found this vid camera: '${vid}'`);
      return this;
    }

    const camera = this.map.get(vid)!;
    let cacheData = this.cacheCameraMap.get(camera);

    if (!cacheData) {
      cacheData = {};
      this.cacheCameraMap.set(camera, cacheData);
    }

    if (!value) {
      if (
        cacheData.setSizeFun &&
        this.engine.hasEventListener("setSize", cacheData.setSizeFun)
      ) {
        this.engine.removeEventListener("setSize", cacheData.setSizeFun);
        cacheData.setSizeFun = undefined;
        return this;
      }

      if (
        cacheData.setSizeFun &&
        !this.engine.hasEventListener("setSize", cacheData.setSizeFun)
      ) {
        cacheData.setSizeFun = undefined;
        return this;
      }
    }

    if (value) {
      if (
        cacheData.setSizeFun &&
        this.engine.hasEventListener("setSize", cacheData.setSizeFun)
      ) {
        return this;
      }

      if (
        cacheData.setSizeFun &&
        !this.engine.hasEventListener("setSize", cacheData.setSizeFun)
      ) {
        this.engine.addEventListener("setSize", cacheData.setSizeFun);
        return this;
      }

      let setSizeFun = (event: SetSizeEvent) => {};

      if (camera instanceof PerspectiveCamera) {
        setSizeFun = (event: SetSizeEvent) => {
          camera.aspect = event.width / event.height;
          camera.updateProjectionMatrix();
        };
      } else if (camera instanceof OrthographicCamera) {
        setSizeFun = (event: SetSizeEvent) => {
          const width = event.width;
          const height = event.height;
          camera.left = -width / 16;
          camera.right = width / 16;
          camera.top = height / 16;
          camera.bottom = -height / 16;
        };
      } else {
        console.warn(
          `camera compiler can not support this class camera:`,
          camera
        );
      }

      this.engine.addEventListener("setSize", setSizeFun);
      cacheData.setSizeFun = setSizeFun;

      // 执行一次
      const domElement = this.engine.webGLRenderer!.domElement;

      setSizeFun({
        type: "setSize",
        width: domElement.offsetWidth,
        height: domElement.offsetHeight,
      });
    }

    return this;
  }

  add(vid: string, config: CameraConfigAllType): this {
    if (config.type && this.constructMap.has(config.type)) {
      const camera = this.constructMap.get(config.type)!();

      Compiler.applyConfig(
        config,
        camera,
        Object.assign(
          {
            lookAt: true,
            adaptiveWindow: true,
          },
          this.filterAttribute
        )
      );

      if (
        camera instanceof PerspectiveCamera ||
        camera instanceof OrthographicCamera
      ) {
        (camera as PerspectiveCamera).updateProjectionMatrix();
      }

      this.map.set(vid, camera);
      this.weakMap.set(camera, vid);

      this.setLookAt(config.vid, config.lookAt);
      this.setAdaptiveWindow(config.vid, config.adaptiveWindow);

      this.scene.add(camera);
    } else {
      console.warn(
        `CameraCompiler: can not support this config type: ${config.type}`
      );
    }

    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `geometry compiler set function can not found vid geometry: '${vid}'`
      );
      return this;
    }

    if (this.filterAttribute[key]) {
      return this;
    }

    if (key === "lookAt") {
      return this.setLookAt(vid, value);
    }

    if (key === "adaptiveWindow") {
      return this.setAdaptiveWindow(vid, value);
    }

    let object = this.map.get(vid)!;

    for (const key of path) {
      if (this.filterAttribute[key]) {
        return this;
      }
      object = object[key];
    }

    object[key] = value;

    if (
      object instanceof PerspectiveCamera ||
      object instanceof OrthographicCamera
    ) {
      (object as PerspectiveCamera).updateProjectionMatrix();
    }

    return this;
  }

  setEngine(engine: Engine): this {
    this.engine = engine;
    return this;
  }

  dispose(): this {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
