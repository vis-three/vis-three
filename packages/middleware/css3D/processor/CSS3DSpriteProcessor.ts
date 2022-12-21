import { CSS3DSprite } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { EngineSupport } from "../../engine";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { CSS3DSpriteConfig } from "../CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor } from "../../module";

export default defineProcessor<CSS3DSpriteConfig, CSS3DSprite, EngineSupport>({
  configType: CONFIGTYPE.CSS3DSPRITE,
  commands: {
    add: (
      objectCommands as unknown as ObjectCommands<
        CSS3DSpriteConfig,
        CSS3DSprite
      >
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<ObjectCommands<CSS3DSpriteConfig, CSS3DSprite>>objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ObjectCommands<
        CSS3DSpriteConfig,
        CSS3DSprite
      >
    ).delete,
  },
  create(config: CSS3DSpriteConfig, engine: EngineSupport): CSS3DSprite {
    return objectCreate(
      new CSS3DSprite(getElement(config.element, engine)),
      config,
      {
        element: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
