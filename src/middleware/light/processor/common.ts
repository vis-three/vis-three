import { Color, Light } from "three";
import { ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { IgnoreAttribute } from "../../../utils/utils";
import { objectCommands, objectCreate } from "../../object/ObjectProcessor";
import { LightConifg } from "../LightConfig";

export const colorHandler = function <C extends LightConifg, O extends Light>({
  target,
  value,
}: ProcessParams<C, O>) {
  target.color.copy(new Color(value));
};

export const emptyHandler = function <
  C extends LightConifg,
  O extends Light
>({}: ProcessParams<C, O>) {};

export const lightCreate = function <C extends LightConifg, O extends Light>(
  light: O,
  config: C,
  filter: IgnoreAttribute = {},
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
