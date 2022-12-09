import { EngineSupport } from "../../../engine/EngineSupport";

export const getElement = function (
  element: string,
  engine: EngineSupport
): HTMLElement {
  const resourceMap = engine.resourceManager.resourceMap;

  if (!resourceMap.has(element)) {
    console.warn(`css3D compiler: can not found resource element: ${element}`);
    return document.createElement("div");
  }

  const resource = resourceMap.get(element);

  if (resource instanceof HTMLElement) {
    return resource;
  } else {
    console.warn(
      `css3D compiler can not suport render this resource type.`,
      (resource as object).constructor,
      element
    );
    return document.createElement("div");
  }
};
