import { CSS3DSprite } from "@vis-three/core";
import { EngineSupport } from "../engine";
import {
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { CSS3DSpriteConfig, getCSS3DSpriteConfig } from "./CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor, ProcessorCommands } from "../module";
import { CSS3DCompiler } from "./CSS3DCompiler";

export default defineProcessor<
  CSS3DSpriteConfig,
  CSS3DSprite,
  EngineSupport,
  CSS3DCompiler
>({
  type: "CSS3DSprite",
  config: getCSS3DSpriteConfig,
  commands: {
    add: (
      objectCommands as unknown as ProcessorCommands<
        CSS3DSpriteConfig,
        CSS3DSprite,
        EngineSupport,
        CSS3DCompiler
      >
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<
        ProcessorCommands<
          CSS3DSpriteConfig,
          CSS3DSprite,
          EngineSupport,
          CSS3DCompiler
        >
      >objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ProcessorCommands<
        CSS3DSpriteConfig,
        CSS3DSprite,
        EngineSupport,
        CSS3DCompiler
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
