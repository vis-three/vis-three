import {
  AmbientLight,
  BaseEvent,
  DirectionalLight,
  Light,
  Line,
  LineBasicMaterial,
  Material,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  Points,
  PointsMaterial,
  Scene,
  Sprite,
  SpriteMaterial,
  Texture,
} from "three";
import { Engine } from "../engine/Engine";
import { Vector3Config } from "../middleware/common/CommonConfig";
import { Plugin } from "./plugin";

export interface DisplayModeParameters {
  mode?: DISPLAYMODE;
  overrideColor?: string;
  defaultAmbientLightSetting?: {
    color?: string;
    intensity?: number;
  };
  defaultDirectionalLightSetting?: {
    color?: string;
    intensity?: number;
    position?: Vector3Config;
  };
  // TODO:增加默认的scene environment
}

export enum DISPLAYMODE {
  // WIREWFRAME = 'wireframe',
  GEOMETRY = "geometry",
  MATERIAL = "material",
  LIGHT = "light",
  ENV = "env",
}

export const DisplayModelPlugin: Plugin<DisplayModeParameters> = function (
  this: Engine,
  params: DisplayModeParameters = {}
): boolean {
  if (!this.webGLRenderer) {
    console.error("must install some renderer before DisplayModel plugin.");
    return false;
  }

  if (!this.scene) {
    console.error("must install some scene before DisplayModel plugin.");
    return false;
  }

  !params.overrideColor && (params.overrideColor = "rgb(250, 250, 250)");

  // 默认环境光
  !params.defaultAmbientLightSetting &&
    (params.defaultAmbientLightSetting = {});
  !params.defaultAmbientLightSetting.color &&
    (params.defaultAmbientLightSetting.color = "rgb(255, 255, 255)");
  !params.defaultAmbientLightSetting.intensity &&
    (params.defaultAmbientLightSetting.intensity = 0.5);

  const defaultAmbientLight = new AmbientLight(
    params.defaultAmbientLightSetting.color,
    params.defaultAmbientLightSetting.intensity
  );
  defaultAmbientLight.matrixAutoUpdate = false;

  // 默认平行光
  !params.defaultDirectionalLightSetting &&
    (params.defaultDirectionalLightSetting = {});
  !params.defaultDirectionalLightSetting.color &&
    (params.defaultDirectionalLightSetting.color = "rgb(255, 255, 255)");
  !params.defaultDirectionalLightSetting.intensity &&
    (params.defaultDirectionalLightSetting.intensity = 0.5);
  !params.defaultDirectionalLightSetting.position &&
    (params.defaultDirectionalLightSetting.position = {
      x: -100,
      y: 100,
      z: 100,
    });

  const defaultDirectionalLight = new DirectionalLight(
    params.defaultDirectionalLightSetting.color,
    params.defaultDirectionalLightSetting.intensity
  );
  defaultDirectionalLight.castShadow = false;
  defaultDirectionalLight.position.set(
    params.defaultDirectionalLightSetting.position.x,
    params.defaultDirectionalLightSetting.position.y,
    params.defaultDirectionalLightSetting.position.z
  );
  defaultDirectionalLight.updateMatrix();
  defaultDirectionalLight.updateMatrixWorld();
  defaultDirectionalLight.matrixAutoUpdate = false;

  !params.mode && (params.mode = DISPLAYMODE.ENV);

  this.displayMode = params.mode;

  const meshOverrideMaterial = new MeshLambertMaterial({
    color: params.overrideColor,
  });
  const lineOverrideMaterial = new LineBasicMaterial({
    color: params.overrideColor,
  });
  const pointsOverrideMaterial = new PointsMaterial({
    color: params.overrideColor,
    size: 5,
    sizeAttenuation: false,
  });
  const spriteOverrideMaterial = new SpriteMaterial({
    color: params.overrideColor,
  });

  const materialCacheMap = new WeakMap<Object3D, Material | Material[]>();

  const lightSet = new Set<Light>();
  const meshSet = new Set<Mesh>();
  const lineSet = new Set<Line>();
  const pointsSet = new Set<Points>();
  const spriteSet = new Set<Sprite>();

  let backgroundCache: Texture | undefined;
  let environmentCache: Texture | undefined;

  const filterTypeMap = {
    Object3D: true,
    Group: true,
  };

  const modeSymbol = Symbol.for("light");

  this.scene.addEventListener("afterAdd", (event) => {
    const displayMode = this.displayMode!;
    const objects = event.objects;

    for (const elem of objects) {
      if (filterTypeMap[elem.type]) {
        continue;
      }

      // 根据模式动态适应
      if (elem instanceof Mesh && elem.type === "Mesh") {
        meshSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = meshOverrideMaterial;
        }
      } else if (elem instanceof Line && elem.type.includes("Line")) {
        lineSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = lineOverrideMaterial;
        }
      } else if (elem instanceof Light && elem.type.includes("Light")) {
        if (elem === defaultAmbientLight || elem === defaultDirectionalLight) {
          continue;
        }
        if (!lightSet.has(elem)) {
          lightSet.add(elem);
        }
        elem[modeSymbol] = true;
        if (
          displayMode !== DISPLAYMODE.ENV &&
          displayMode !== DISPLAYMODE.LIGHT
        ) {
          this.scene!.remove(elem);
        }
      } else if (elem instanceof Points && elem.type === "Points") {
        pointsSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = pointsOverrideMaterial;
        }
      } else if (elem instanceof Sprite && elem.type === "Sprite") {
        spriteSet.add(elem);
        if (displayMode === DISPLAYMODE.GEOMETRY) {
          materialCacheMap.set(elem, elem.material);
          elem.material = spriteOverrideMaterial;
        }
      }
    }
  });

  this.scene.addEventListener("afterRemove", (event) => {
    const objects = event.objects;

    for (const elem of objects) {
      if (filterTypeMap[elem.type]) {
        continue;
      }

      // 根据模式动态适应
      if (elem instanceof Mesh && elem.type === "Mesh") {
        meshSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Line && elem.type.includes("Line")) {
        lineSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Light && elem.type.includes("Light")) {
        if (elem === defaultAmbientLight || elem === defaultDirectionalLight) {
          continue;
        }

        if (!elem[modeSymbol]) {
          lightSet.delete(elem);
        }
      } else if (elem instanceof Points && elem.type === "Points") {
        pointsSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      } else if (elem instanceof Sprite && elem.type === "Sprite") {
        spriteSet.delete(elem);
        materialCacheMap.has(elem) && materialCacheMap.delete(elem);
      }
    }
  });

  this.setDisplayMode = function (mode: DISPLAYMODE): Engine {
    this.displayMode = mode || DISPLAYMODE.ENV;
    // 过滤材质
    const filterMaterial = (): void => {
      for (const mesh of meshSet) {
        if (mesh.material === meshOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(mesh, mesh.material);
        mesh.material = meshOverrideMaterial;
      }

      for (const line of lineSet) {
        if (line.material === lineOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(line, line.material);
        line.material = lineOverrideMaterial;
      }

      for (const points of pointsSet) {
        if (points.material === pointsOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(points, points.material);
        points.material = pointsOverrideMaterial;
      }

      for (const sprite of spriteSet) {
        if (sprite.material === spriteOverrideMaterial) {
          continue;
        }
        materialCacheMap.set(sprite, sprite.material);
        sprite.material = spriteOverrideMaterial;
      }
    };
    // 还原材质
    const reduceMaterial = (): void => {
      meshSet.forEach((mesh) => {
        if (materialCacheMap.has(mesh)) {
          mesh.material = materialCacheMap.get(mesh)!;
          materialCacheMap.delete(mesh);
        }
      });
      lineSet.forEach((line) => {
        if (materialCacheMap.has(line)) {
          line.material = materialCacheMap.get(line)!;
          materialCacheMap.delete(line);
        }
      });
      pointsSet.forEach((points) => {
        if (materialCacheMap.has(points)) {
          points.material = materialCacheMap.get(points)!;
          materialCacheMap.delete(points);
        }
      });
      spriteSet.forEach((sprite) => {
        if (materialCacheMap.has(sprite)) {
          sprite.material = materialCacheMap.get(sprite)! as SpriteMaterial;
          materialCacheMap.delete(sprite);
        }
      });
    };
    // 过滤灯光
    const filterLight = (): void => {
      lightSet.forEach((light) => {
        light[modeSymbol] = true;
        this.scene!.remove(light);
      });
      this.scene!.add(defaultAmbientLight!);
      this.scene!.add(defaultDirectionalLight!);
    };
    // 还原灯光
    const reduceLight = (): void => {
      lightSet.forEach((light) => {
        light[modeSymbol] = false;
        this.scene!.add(light);
      });
      this.scene!.remove(defaultAmbientLight!);
      this.scene!.remove(defaultDirectionalLight!);
    };
    // 过滤场景设置
    const filterScene = (): void => {
      if (this.scene!.background instanceof Texture) {
        backgroundCache = this.scene!.background;
        this.scene!.background = null;
      }

      if (this.scene!.environment instanceof Texture) {
        environmentCache = this.scene!.environment;
        this.scene!.environment = null;
      }
    };
    // 还原场景
    const reduceScene = (): void => {
      if (backgroundCache) {
        this.scene!.background = backgroundCache;
        backgroundCache = undefined;
      }

      if (environmentCache) {
        this.scene!.environment = environmentCache;
        environmentCache = undefined;
      }
    };

    if (mode === DISPLAYMODE.GEOMETRY) {
      filterMaterial();
      filterScene();
      filterLight();
    } else if (mode === DISPLAYMODE.MATERIAL) {
      reduceMaterial();
      filterScene();
      filterLight();
    } else if (mode === DISPLAYMODE.LIGHT) {
      reduceMaterial();
      filterScene();
      reduceLight();
    } else if (mode === DISPLAYMODE.ENV) {
      reduceMaterial();
      reduceScene();
      reduceLight();
    } else {
      console.warn(`displayMode plugin can not set this mode: ${mode}`);
    }
    return this;
  };

  return true;
};
