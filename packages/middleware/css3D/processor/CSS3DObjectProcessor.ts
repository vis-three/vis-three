import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { CSS3DObjectConfig } from "../CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor } from "../../module";
import { EngineSupport } from "../../engine";

export default defineProcessor<CSS3DObjectConfig, CSS3DObject, EngineSupport>({
  configType: CONFIGTYPE.CSS3DOBJECT,
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
