import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import {
  CSS3DPlaneConfig,
  CSS3DSpriteConfig,
  getCSS3DSpriteConfig,
} from "../CSS3DConfig";
import { CSS3DPlane } from "../extends/CSS3DPlane";
import { EngineSupport } from "@vis-three/tdcm";
import { CSS3DSprite } from "../extends/CSS3DSprite";

export default defineObjectModel<
  CSS3DSpriteConfig,
  CSS3DSprite,
  {},
  {
    getElement: (element: string, engine: EngineSupport) => HTMLElement;
  }
>((objectModel) => ({
  type: "CSS3DSprite",
  config: getCSS3DSpriteConfig,
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
    const css3d = new CSS3DSprite(model.getElement(config.element, engine));

    objectModel.create!<CSS3DSpriteConfig>({
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
