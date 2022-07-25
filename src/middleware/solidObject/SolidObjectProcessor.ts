import {
  BoxBufferGeometry,
  BufferGeometry,
  Material,
  ShaderMaterial,
  Sprite,
} from "three";
import { EngineSupport } from "../../engine/EngineSupport";
import { IgnoreAttribute } from "../../utils/utils";
import {
  objectCommands,
  ObjectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { SolidObject3D } from "./SolidObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export const replaceMaterial = new ShaderMaterial({
  fragmentShader: `
  void main () {
    gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
  }
  `,
});

export const replaceGeometry = new BoxBufferGeometry(10, 10, 10);

export const geometryHandler = function <
  C extends SolidObjectConfig,
  O extends SolidObject3D
>({ target, value, engine }) {
  const geometry = engine.compilerManager.getGeometry(value);
  if (!geometry) {
    console.warn(`can not found geometry by vid in engine: ${value}`);
    target.geometry = replaceGeometry;
    return;
  }

  target.geometry = geometry;
};

export const materialHandler = function <
  C extends SolidObjectConfig,
  O extends SolidObject3D
>({ target, config, engine }) {
  let material: Material | Material[];
  if (typeof config.material === "string") {
    material =
      engine.compilerManager.getMaterial(config.material) || replaceMaterial;
  } else {
    material = config.material.map(
      (vid) => engine.compilerManager.getMaterial(vid) || replaceMaterial
    );
  }

  target.material = material;
};

export const solidObjectCreate = function <
  C extends SolidObjectConfig,
  O extends SolidObject3D
>(object: O, config: C, filter: IgnoreAttribute = {}, engine: EngineSupport) {
  if (!filter.geometry) {
    let geometry = engine.getObjectBySymbol(
      config.geometry
    ) as unknown as BufferGeometry;

    if (!(geometry instanceof BufferGeometry)) {
      console.warn(
        `geometry vid in engine is not instance of BufferGeometry: ${config.geometry}`,
        geometry
      );
      geometry = replaceGeometry;
    }
    object.geometry.dispose();
    object.geometry = geometry;
  }

  if (!filter.material) {
    let material: Material | Material[];
    if (typeof config.material === "string") {
      material =
        engine.compilerManager.getMaterial(config.material) || replaceMaterial;
    } else {
      material = config.material.map(
        (vid) => engine.compilerManager.getMaterial(vid) || replaceMaterial
      );
    }

    object.material = material;
  }

  return objectCreate(
    object,
    config,
    {
      geometry: true,
      material: true,
      ...filter,
    },
    engine
  );
};

export const solidObjectDispose = function <O extends SolidObject3D>(
  target: O
) {
  objectDispose(target);
};

export type SolidObjectCommands<
  C extends SolidObjectConfig,
  T extends SolidObject3D
> = ObjectCommands<C, T>;

export const solidObjectCommands: SolidObjectCommands<
  SolidObjectConfig,
  SolidObject3D
> = {
  add: {
    material: materialHandler,
    ...(<SolidObjectCommands<SolidObjectConfig, SolidObject3D>>(
      objectCommands.add
    )),
  },
  set: {
    geometry: geometryHandler,
    material: materialHandler,
    ...(<SolidObjectCommands<SolidObjectConfig, SolidObject3D>>(
      objectCommands.set
    )),
  },
  delete: {
    material: materialHandler,
    ...(<SolidObjectCommands<SolidObjectConfig, SolidObject3D>>(
      objectCommands.delete
    )),
  },
};
