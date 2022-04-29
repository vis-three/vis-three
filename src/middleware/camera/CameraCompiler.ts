import { Camera, OrthographicCamera, PerspectiveCamera, Vector3 } from "three";
import { CameraConfigAllType } from "./CameraConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SetSizeEvent } from "../../engine/Engine";

export interface CameraCompilerTarget
  extends ObjectCompilerTarget<CameraConfigAllType> {
  [key: string]: CameraConfigAllType;
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

  private constructMap: Map<string, () => Camera>;
  private cacheCameraMap: WeakMap<Camera, CacheCameraData>;

  constructor() {
    super();
    const constructMap = new Map();
    constructMap.set("PerspectiveCamera", () => new PerspectiveCamera());
    constructMap.set(
      "OrthographicCamera",
      () => new OrthographicCamera(-50, 50, 50, -50)
    );

    this.constructMap = constructMap;

    this.mergeFilterAttribute({
      scale: true,
      adaptiveWindow: true,
    });

    this.cacheCameraMap = new WeakMap();
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
          camera.left = -width / 2;
          camera.right = width / 2;
          camera.top = height / 2;
          camera.bottom = -height / 2;
          camera.updateProjectionMatrix();
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
      const domElement = this.engine.dom!;

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

      this.map.set(vid, camera);
      this.weakMap.set(camera, vid);

      this.setLookAt(config.vid, config.lookAt);
      this.setAdaptiveWindow(config.vid, config.adaptiveWindow);

      super.add(vid, config);

      if (
        camera instanceof PerspectiveCamera ||
        camera instanceof OrthographicCamera
      ) {
        (camera as PerspectiveCamera).updateProjectionMatrix();
      }
    } else {
      console.warn(
        `CameraCompiler: can not support this config type: ${config.type}`
      );
    }

    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (key === "adaptiveWindow") {
      return this.setAdaptiveWindow(vid, value);
    }

    super.set(vid, path, key, value);

    const object = this.map.get(vid);

    if (
      object &&
      (object instanceof PerspectiveCamera ||
        object instanceof OrthographicCamera)
    ) {
      (object as PerspectiveCamera).updateProjectionMatrix();
    }

    return this;
  }

  dispose(): this {
    super.dispose();
    return this;
  }
}
