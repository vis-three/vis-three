import { CSS3DPlane } from "@vis-three/core";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { CSS3DPlaneConfig, getCSS3DPlaneConfig } from "./CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor, ProcessorCommands } from "../module";
import { EngineSupport } from "../engine";
import { CSS3DCompiler } from "./CSS3DCompiler";

export default defineProcessor<
  CSS3DPlaneConfig,
  CSS3DPlane,
  EngineSupport,
  CSS3DCompiler
>({
  type: "CSS3DPlane",
  config: getCSS3DPlaneConfig,
  commands: {
    add: (
      objectCommands as unknown as ProcessorCommands<
        CSS3DPlaneConfig,
        CSS3DPlane,
        EngineSupport,
        CSS3DCompiler
      >
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<ObjectCommands<CSS3DPlaneConfig, CSS3DPlane>>objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ProcessorCommands<
        CSS3DPlaneConfig,
        CSS3DPlane,
        EngineSupport,
        CSS3DCompiler
      >
    ).delete,
  },
  create(config: CSS3DPlaneConfig, engine: EngineSupport): CSS3DPlane {
    return objectCreate(
      new CSS3DPlane(getElement(config.element, engine)),
      config,
      {
        element: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
