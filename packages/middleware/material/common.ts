import { IgnoreAttribute, syncObject } from "@vis-three/utils";
import { Color, Material, Texture } from "three";
import { EngineSupport } from "../engine";
import { ProcessParams } from "../module";
import { globalAntiShake } from "../utils";
import { MaterialCompiler } from "./MaterialCompiler";

import { MaterialConfig } from "./MaterialConfig";

export const commonNeedUpdatesRegCommand = {
  reg: new RegExp("transparent|sizeAttenuation"),
  handler<T extends Material, C extends MaterialConfig>({
    target,
    key,
    value,
  }: ProcessParams<C, T, EngineSupport, MaterialCompiler>) {
    target[key] = value;
    target.needsUpdate = true;
  },
};

export const mapHandler = function <
  T extends Material,
  C extends MaterialConfig
>({
  target,
  key,
  value,
  engine,
}: ProcessParams<C, T, EngineSupport, MaterialCompiler>) {
  globalAntiShake.exec((finish) => {
    if (!value) {
      target[key] = null;
      target.needsUpdate = true;
      return true;
    }

    const texture = engine.compilerManager.getObjectBySymbol(value);

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

export const commonMapRegCommand = {
  reg: new RegExp("map$", "i"),
  handler: mapHandler,
};

export const colorSetHandler = function <
  T extends Material,
  C extends MaterialConfig
>({
  target,
  key,
  value,
}: ProcessParams<C, T, EngineSupport, MaterialCompiler>) {
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
      mapHandler({ target, key, value: config[key], engine } as ProcessParams<
        C,
        T,
        EngineSupport,
        MaterialCompiler
      >);
      filter[key] = true;
    } else if (target[key] instanceof Color) {
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
