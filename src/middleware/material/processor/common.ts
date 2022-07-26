import { Color, Material, Texture } from "three";
import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { IgnoreAttribute, syncObject } from "../../../utils/utils";
import { MaterialConfig } from "../MaterialConfig";

export const commonNeedUpdatesRegCommand = {
  reg: new RegExp("transparent|sizeAttenuation"),
  handler<T extends Material, C extends MaterialConfig>({
    target,
    key,
    value,
    engine,
  }: ProcessParams<C, T>) {
    target[key] = value;
    target.needsUpdate = true;
  },
};

export const commonMapRegCommand = {
  reg: new RegExp("map$", "i"),
  handler<T extends Material, C extends MaterialConfig>({
    target,
    key,
    value,
    engine,
  }: ProcessParams<C, T>) {
    const texture = engine.resourceManager.resourceMap.get(value);
    if (!(texture instanceof Texture)) {
      console.warn(
        `this url resource is not instance of Texture: ${key}`,
        value,
        texture
      );
    }
    target[key] = texture;
    target.needsUpdate = true;
  },
};

export const colorSetHandler = function <
  T extends Material,
  C extends MaterialConfig
>({ target, key, value }: ProcessParams<C, T>) {
  (target[key] as Color).copy(new Color(value));
};

export const create = function <T extends Material, C extends MaterialConfig>(
  target: T,
  config: C,
  engine: EngineSupport
): T {
  const filter: IgnoreAttribute<C> = {} as IgnoreAttribute<C>;

  for (const key of Object.keys(config)) {
    if (key.toLocaleLowerCase().endsWith("map") && config[key]) {
      const texture = engine.compilerManager.getObjectBySymbol(config[key]);
      if (!(texture instanceof Texture)) {
        console.warn(
          `this url resource is not instance of Texture: ${key}`,
          config[key],
          texture
        );
        continue;
      }
      target[key] = texture;
      filter[key] = true;
    } else if (["color", "emissive", "specular"].includes(key)) {
      target[key] = new Color(config[key]);
      filter[key] = true;
    }
  }

  syncObject(config, target, filter);

  target.needsUpdate = true;

  return target;
};

export const dispose = function <T extends Material>(target: T) {
  target.dispose();
};
