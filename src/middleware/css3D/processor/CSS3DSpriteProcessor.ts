import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { VisCSS3DSprite } from "../../../optimize/VisCSS3DSprite";
import { CONFIGTYPE } from "../../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { CSS3DSpriteConfig } from "../CSS3DConfig";
import { getElement } from "./common";

export default defineProcessor<CSS3DSpriteConfig, VisCSS3DSprite>({
  configType: CONFIGTYPE.CSS3DSPRITE,
  commands: {
    add: (
      objectCommands as unknown as ObjectCommands<
        CSS3DSpriteConfig,
        VisCSS3DSprite
      >
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<ObjectCommands<CSS3DSpriteConfig, VisCSS3DSprite>>(
        objectCommands.set
      )),
    },
    delete: (
      objectCommands as unknown as ObjectCommands<
        CSS3DSpriteConfig,
        VisCSS3DSprite
      >
    ).delete,
  },
  create(config: CSS3DSpriteConfig, engine: EngineSupport): VisCSS3DSprite {
    return objectCreate(
      new VisCSS3DSprite(getElement(config.element, engine)),
      config,
      {
        element: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
