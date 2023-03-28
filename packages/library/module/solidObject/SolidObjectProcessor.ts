import {
  Compiler,
  EngineSupport,
  globalAntiShake,
  MODULETYPE,
  ProcessParams,
} from "@vis-three/middleware";
import {
  objectCommands,
  ObjectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";
import { IgnoreAttribute } from "@vis-three/utils";
import {
  BoxBufferGeometry,
  BufferGeometry,
  Material,
  ShaderMaterial,
} from "three";

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
>({ target, value, engine }: ProcessParams<C, O, EngineSupport, any>) {
  globalAntiShake.exec((finish) => {
    const geometry = engine.compilerManager.getObjectfromModule(
      MODULETYPE.GEOMETRY,
      value
    ) as BufferGeometry;
    if (!geometry) {
      if (finish) {
        console.warn(`can not found geometry by vid in engine: ${value}`);
      }
      target.geometry = replaceGeometry;
      return false;
    }

    target.geometry = geometry;

    return true;
  });
};

export const materialHandler = function <
  C extends SolidObjectConfig,
  O extends SolidObject3D
>({ target, config, engine }: ProcessParams<C, O, EngineSupport, any>) {
  globalAntiShake.exec((finish) => {
    let material: Material | Material[];
    if (typeof config.material === "string") {
      material =
        (engine.compilerManager.getObjectfromModule(
          MODULETYPE.MATERIAL,
          config.material
        ) as Material) || replaceMaterial;
    } else {
      material = config.material.map(
        (vid) =>
          (engine.compilerManager.getObjectfromModule(
            MODULETYPE.MATERIAL,
            vid
          ) as Material) || replaceMaterial
      );
    }

    target.material = material;

    if (
      (Array.isArray(material) &&
        material.length &&
        material[0] === replaceMaterial) ||
      material === replaceMaterial
    ) {
      return false;
    }

    return true;
  });
};

export const solidObjectCreate = function <
  C extends SolidObjectConfig,
  O extends SolidObject3D
>(object: O, config: C, filter: IgnoreAttribute<C>, engine: EngineSupport) {
  if (!filter.geometry) {
    object.geometry.dispose();
    geometryHandler({
      target: object,
      value: config.geometry,
      engine,
    } as ProcessParams<C, O, EngineSupport, any>);
  }

  if (!filter.material) {
    materialHandler({ target: object, config, engine } as ProcessParams<
      C,
      O,
      EngineSupport,
      any
    >);
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
