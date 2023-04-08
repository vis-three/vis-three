import { CSS2DPlaneConfig, getCSS2DPlaneConfig } from "../CSS2DConfig";
import { CSS2DCompiler } from "../CSS2DCompiler";
import {
  defineProcessor,
  EngineSupport,
  ProcessorCommands,
} from "@vis-three/middleware";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";
import { CSS2DPlane } from "../extends/CSS2DPlane";

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

export default defineProcessor<
  CSS2DPlaneConfig,
  CSS2DPlane,
  EngineSupport,
  CSS2DCompiler
>({
  type: "CSS2DPlane",
  config: getCSS2DPlaneConfig,
  commands: {
    add: (
      objectCommands as unknown as ProcessorCommands<
        CSS2DPlaneConfig,
        CSS2DPlane,
        EngineSupport,
        CSS2DCompiler
      >
    ).add,
    set: {
      element({ target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(getElement(value, engine));
      },
      ...(<ObjectCommands<CSS2DPlaneConfig, CSS2DPlane>>objectCommands.set),
    },
    delete: (
      objectCommands as unknown as ProcessorCommands<
        CSS2DPlaneConfig,
        CSS2DPlane,
        EngineSupport,
        CSS2DCompiler
      >
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
