import {
  defineModule,
  EngineSupport,
  SUPPORT_LIFE_CYCLE,
} from "@vis-three/tdcm";
import {
  defineObjectModel,
  ObjectModel,
  ObjectRule,
} from "@vis-three/module-object";
import { CSS2DPlaneConfig, getCSS2DPlaneConfig } from "./CSS2DConfig";
import { CSS2DPlane } from "./extends/CSS2DPlane";

export * from "./CSS2DConfig";

export default defineModule({
  type: "css2D",
  object: true,
  rule: ObjectRule,
  models: [
    defineObjectModel<
      CSS2DPlaneConfig,
      CSS2DPlane,
      {},
      {
        getElement: (element: string, engine: EngineSupport) => HTMLElement;
      }
    >((objectModel) => ({
      type: "CSS2DPlane",
      config: getCSS2DPlaneConfig,
      shared: {
        getElement(element: string, engine: EngineSupport): HTMLElement {
          const resourceMap = engine.resourceManager.resourceMap;

          if (!resourceMap.has(element)) {
            console.warn(
              `css2D compiler: can not found resource element: ${element}`
            );
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
        const css2d = new CSS2DPlane(model.getElement(config.element, engine));

        objectModel.create!<CSS2DPlaneConfig>({
          model: model as unknown as ObjectModel,
          target: css2d,
          config,
          filter: {
            element: true,
          },
          engine,
        });

        return css2d;
      },
      dispose({ target }) {
        objectModel.dispose!({ target });
      },
    })),
  ],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
