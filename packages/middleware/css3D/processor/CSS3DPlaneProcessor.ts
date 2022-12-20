import { CSS3DPlane } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { CSS3DPlaneConfig } from "../CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor } from "../../module";
import { EngineSupport } from "../../engine";

export default defineProcessor<CSS3DPlaneConfig, CSS3DPlane>({
  configType: CONFIGTYPE.CSS3DPLANE,
  commands: {
    add: (
      objectCommands as unknown as ObjectCommands<CSS3DPlaneConfig, CSS3DPlane>
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<ObjectCommands<CSS3DPlaneConfig, CSS3DPlane>>objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ObjectCommands<CSS3DPlaneConfig, CSS3DPlane>
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
