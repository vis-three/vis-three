import { IgnoreAttribute } from "@vis-three/utils";
import { Color, Light } from "three";
import { EngineSupport } from "../../engine";
import { emptyHandler, ProcessParams } from "../../module";
import { objectCommands, objectCreate } from "../../object/ObjectProcessor";
import { LightConifg } from "../LightConfig";

export const colorHandler = function <C extends LightConifg, O extends Light>({
  target,
  value,
}: ProcessParams<C, O, EngineSupport>) {
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

export const lightCommands = Object.assign({}, objectCommands, {
  set: {
    color: colorHandler,
    scale: emptyHandler,
    rotation: emptyHandler,
    lookAt: emptyHandler,
  },
});
