import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { SolidObjectConfig } from "./SolidObjectConfig";
import {
  BoxGeometry,
  BufferGeometry,
  Material,
  Mesh,
  Object3D,
  ShaderMaterial,
} from "three";
import {
  CommandParameters,
  Compiler,
  EngineSupport,
  Model,
  MODULE_TYPE,
} from "@vis-three/tdcm";
import { IgnoreAttribute } from "@vis-three/utils";

export * from "./SolidObjectConfig";

export interface SolidObjectShared {
  replaceMaterial: ShaderMaterial;
  replaceGeometry: BoxGeometry;
}

export type SolidObjectCommandParameters = CommandParameters<
  SolidObjectConfig,
  Object3D,
  EngineSupport,
  Compiler<EngineSupport>,
  Model<SolidObjectConfig, Object3D> & Readonly<SolidObjectShared>
>;

export type SolidObjectCommandHandler = (
  this: Model<SolidObjectConfig, Object3D> & Readonly<SolidObjectShared>,
  params: SolidObjectCommandParameters
) => void;

export type SolidObjectModel = Model<SolidObjectConfig, Object3D> &
  Readonly<SolidObjectShared>;

export const geometryHandler: SolidObjectCommandHandler = function ({
  model,
  target,
  value,
  engine,
}) {
  model.toAsync((finish) => {
    const geometry = engine.compilerManager.getObjectFromModule(
      MODULE_TYPE.GEOMETRY,
      value
    ) as BufferGeometry;
    if (!geometry) {
      if (finish) {
        console.warn(`can not found geometry by vid in engine: ${value}`);
      }
      (<Mesh>target).geometry = model.replaceGeometry;
      return false;
    }

    (<Mesh>target).geometry = geometry;

    return true;
  });
};

export const materialHandler: SolidObjectCommandHandler = function ({
  model,
  target,
  config,
  engine,
}) {
  model.toAsync((finish) => {
    let material: Material | Material[];
    if (typeof config.material === "string") {
      material =
        (engine.compilerManager.getObjectFromModule(
          MODULE_TYPE.MATERIAL,
          config.material
        ) as Material) || model.replaceMaterial;
    } else {
      material = config.material.map(
        (vid) =>
          (engine.compilerManager.getObjectFromModule(
            MODULE_TYPE.MATERIAL,
            vid
          ) as Material) || model.replaceMaterial
      );
    }

    (<Mesh>target).material = material;

    if (
      (Array.isArray(material) &&
        material.length &&
        material[0] === model.replaceMaterial) ||
      material === model.replaceMaterial
    ) {
      return false;
    }

    return true;
  });
};

export const defineSolidObjectModel = defineObjectModel.extend<
  SolidObjectConfig,
  Object3D,
  {},
  SolidObjectShared,
  EngineSupport,
  Compiler<EngineSupport>,
  <O extends Object3D, C extends SolidObjectConfig>(params: {
    model: SolidObjectModel;
    target: O;
    config: C;
    filter: IgnoreAttribute<C>;
    engine: EngineSupport;
  }) => void,
  <O extends Object3D>(params: { target: O }) => void
>((objectModel) => ({
  shared: {
    replaceMaterial: new ShaderMaterial({
      fragmentShader: `
      void main () {
        gl_FragColor = vec4(0.5, 0.5, 0.5, 1.0);
      }
      `,
    }),
    replaceGeometry: new BoxGeometry(10, 10, 10),
  },
  commands: {
    add: {
      material: materialHandler,
    },
    set: {
      geometry: geometryHandler,
      material: materialHandler,
    },
    delete: {
      material: materialHandler,
    },
  },
  create({ model, target, config, filter, engine }) {
    if (!filter.geometry) {
      (<Mesh>(<unknown>target)).geometry.dispose();

      geometryHandler.call(model, {
        model,
        target,
        value: config.geometry,
        engine,
      } as unknown as SolidObjectCommandParameters);
    }

    if (!filter.material) {
      materialHandler.call(model, {
        target,
        config,
        engine,
      } as unknown as SolidObjectCommandParameters);
    }

    objectModel.create!({
      model: model as unknown as ObjectModel,
      target,
      config,
      filter,
      engine,
    });
  },

  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
