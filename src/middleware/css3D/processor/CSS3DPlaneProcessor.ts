import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CSS3DPlane } from "../../../optimize/CSS3DPlane";
import { CONFIGTYPE } from "../../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { CSS3DPlaneConfig } from "../CSS3DConfig";
import { getElement } from "./common";

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
    const dom = document.createElement("div");
    const children = getElement(config.element, engine);
    dom.appendChild(children);

    return objectCreate(
      new CSS3DPlane(dom),
      config,
      {
        element: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
