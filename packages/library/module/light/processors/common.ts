import {
  emptyHandler,
  EngineSupport,
  ProcessorCommands,
  ProcessParams,
} from "@vis-three/middleware";
import { objectCommands, objectCreate } from "@vis-three/module-object";
import { IgnoreAttribute } from "@vis-three/utils";
import { Color, Light, Object3D } from "three";
import { LightCompiler } from "../LightCompiler";
import { LightConifg } from "../LightConfig";

export const colorHandler = function <C extends LightConifg, O extends Light>({
  target,
  value,
}: ProcessParams<C, O, EngineSupport, LightCompiler>) {
  target.color.copy(new Color(value));
};

export const lightCreate = function <C extends LightConifg, O extends Light>(
  light: O,
  config: C,
  filter: IgnoreAttribute<C>,
  engine: EngineSupport
) {
  light.color.copy(new Color(config.color));
  return objectCreate(
    light,
    config,
    {
      color: true,
      scale: true,
      rotation: true,
      lookAt: true,
      ...filter,
    },
    engine
  );
};

export type LightCommands<
  C extends LightConifg,
  O extends Light
> = ProcessorCommands<C, O, EngineSupport, LightCompiler>;

export const lightCommands = Object.assign({}, objectCommands, {
  set: {
    color: colorHandler,
    scale: emptyHandler,
    rotation: emptyHandler,
    lookAt: emptyHandler,
  },
});
