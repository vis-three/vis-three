import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { CSS3DPlaneConfig, getCSS3DPlaneConfig } from "../CSS3DConfig";
import { CSS3DPlane } from "../extends/CSS3DPlane";
import { EngineSupport } from "@vis-three/tdcm";

export default defineObjectModel<
  CSS3DPlaneConfig,
  CSS3DPlane,
  {},
  {
    getElement: (element: string, engine: EngineSupport) => HTMLElement;
  }
>((objectModel) => ({
  type: "CSS3DPlane",
  config: getCSS3DPlaneConfig,
  shared: {
    getElement(element, engine) {
      const resourceMap = engine.resourceManager.resourceMap;

      if (!resourceMap.has(element)) {
        console.warn(
          `css3D compiler: can not found resource element: ${element}`
        );
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
    },
  },
  commands: {
    set: {
      element({ model, target, value, engine }) {
        target.element.innerHTML = "";
        target.element.appendChild(model.getElement(value, engine));
      },
    },
  },
  create({ model, config, engine }) {
    const css3d = new CSS3DPlane(model.getElement(config.element, engine));

    objectModel.create!<CSS3DPlaneConfig>({
      model: model as unknown as ObjectModel,
      target: css3d,
      config,
      filter: {
        element: true,
      },
      engine,
    });
    return css3d;
  },
  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
