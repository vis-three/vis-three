import { CSS2DPlane, EngineSupport, defineProcessor } from "@vis-three/core";
import { CONFIGTYPE } from "../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import { CSS2DPlaneConfig } from "./CSS2DConfig";

export const getElement = function (
  element: string,
  engine: EngineSupport
): HTMLElement {
  const resourceMap = engine.resourceManager.resourceMap;

  if (!resourceMap.has(element)) {
    console.warn(`css2D compiler: can not found resource element: ${element}`);
    return document.createElement("div");
  }

  const resource = resourceMap.get(element);

  if (resource instanceof HTMLElement) {
    return resource;
  } else {
    console.warn(
      `css2D compiler can not suport render this resource type.`,
      (resource as object).constructor,
      element
    );
    return document.createElement("div");
  }
};

export default defineProcessor<CSS2DPlaneConfig, CSS2DPlane>({
  configType: CONFIGTYPE.CSS2DPLANE,
  commands: {
    add: (
      objectCommands as unknown as ObjectCommands<CSS2DPlaneConfig, CSS2DPlane>
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<ObjectCommands<CSS2DPlaneConfig, CSS2DPlane>>objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ObjectCommands<CSS2DPlaneConfig, CSS2DPlane>
    ).delete,
  },
  create(config: CSS2DPlaneConfig, engine: EngineSupport): CSS2DPlane {
    return objectCreate(
      new CSS2DPlane(getElement(config.element, engine)),
      config,
      {
        element: true,
      },
      engine
    );
  },
  dispose: objectDispose,
});
