import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CSS3DObjectConfig, getCSS3DObjectConfig } from "./CSS3DConfig";
import { getElement } from "./common";
import { CSS3DCompiler } from "./CSS3DCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";

export default defineProcessor<
  CSS3DObjectConfig,
  CSS3DObject,
  EngineSupport,
  CSS3DCompiler
>({
  type: "CSS3DObject",
  config: getCSS3DObjectConfig,
  commands: {
    add: (
      objectCommands as unknown as ObjectCommands<
        CSS3DObjectConfig,
        CSS3DObject
      >
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element = getElement(value, engine);
      },
      ...(<ObjectCommands<CSS3DObjectConfig, CSS3DObject>>objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ObjectCommands<
        CSS3DObjectConfig,
        CSS3DObject
      >
    ).delete,
  },
  create(config: CSS3DObjectConfig, engine: EngineSupport): CSS3DObject {
    return objectCreate(
      new CSS3DObject(getElement(config.element, engine)),
      config,
      {
        element: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
