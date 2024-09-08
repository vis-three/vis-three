import {
  CommandParameters,
  Compiler,
  defineModel,
  EngineSupport,
  Model,
  MODULE_TYPE,
  RegCommand,
} from "@vis-three/tdcm";
import { MaterialConfig } from "../MaterialConfig";
import { Color, Material, Texture } from "three";
import { IgnoreAttribute, syncObject } from "@vis-three/utils";

export interface MaterialModelShared {
  cacheColor: Color;
}

export type MaterialModel = Model<MaterialConfig, Material> &
  Readonly<MaterialModelShared>;

export type MaterialCommandParameters = CommandParameters<
  MaterialConfig,
  Material,
  EngineSupport,
  Compiler<EngineSupport>,
  MaterialModel
>;

export type MaterialCommandHanlder = (
  this: MaterialModel,
  params: MaterialCommandParameters
) => void;

export type MaterialRegCommand = RegCommand<
  MaterialConfig,
  Material,
  EngineSupport,
  Compiler<EngineSupport>,
  MaterialModel
>;

export const needUpdatesRegCommand: MaterialRegCommand = {
  reg: new RegExp("transparent|sizeAttenuation"),
  handler({ target, key, value }) {
    target[key] = value;
    target.needsUpdate = true;
  },
};

export const mapHandler: MaterialCommandHanlder = function ({
  model,
  target,
  key,
  value,
  engine,
}) {
  model.toAsync((finish) => {
    if (!value) {
      target[key] = null;
      target.needsUpdate = true;
      return true;
    }

    const texture = engine.compilerManager.getObjectFromModule(
      MODULE_TYPE.TEXTURE,
      value
    );

    if (!(texture instanceof Texture)) {
      finish &&
        console.warn(
          `this url resource is not instance of Texture: ${key}`,
          value,
          texture
        );

      target[key] = null;
      return false;
    }
    target[key] = texture;
    target.needsUpdate = true;
    return true;
  });
};

export const getMapHandler = function <
  T extends Material,
  C extends MaterialConfig
>() {
  return mapHandler as any;
};

export const mapRegCommand: MaterialRegCommand = {
  reg: new RegExp("map$", "i"),
  handler: mapHandler,
};

export const colorSetHandler: MaterialCommandHanlder = function ({
  model,
  target,
  key,
  value,
}) {
  (target[key] as Color).copy(model.cacheColor.set(value));
};

export const getColorSetHandler = function <
  T extends Material,
  C extends MaterialConfig
>() {
  return colorSetHandler as any;
};

export const defineMaterialModel = defineModel.extend<
  MaterialConfig,
  Material,
  {},
  MaterialModelShared,
  EngineSupport,
  Compiler<EngineSupport>,
  <T extends Material, C extends MaterialConfig>(params: {
    model: MaterialModel;
    target: T;
    config: C;
    engine: EngineSupport;
  }) => T,
  <T extends Material>(params: { target: T }) => void
>({
  commands: {
    set: {
      $reg: [mapRegCommand, needUpdatesRegCommand],
    },
  },
  create<T extends Material, C extends MaterialConfig>({
    model,
    target,
    config,
    engine,
  }) {
    const filter: IgnoreAttribute<C> = {} as IgnoreAttribute<C>;

    for (const key of Object.keys(config)) {
      if (key.toLocaleLowerCase().endsWith("map") && config[key]) {
        mapHandler.call(model, {
          model,
          target,
          key,
          value: config[key],
          engine,
        } as MaterialCommandParameters);
        filter[key] = true;
      } else if (target[key] instanceof Color) {
        target[key] = new Color(config[key]);
        filter[key] = true;
      }
    }

    syncObject(config, target, filter);

    target.needsUpdate = true;

    return target as T;
  },
  dispose<T extends Material>({ target }) {
    target.dispose();
  },
});
