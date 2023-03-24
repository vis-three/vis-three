import { CSS2DPlane } from "@vis-three/core";
import { getCSS2DPlaneConfig } from "./CSS2DConfig";
import { defineProcessor, } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
export const getElement = function (element, engine) {
    const resourceMap = engine.resourceManager.resourceMap;
    if (!resourceMap.has(element)) {
        console.warn(`css2D compiler: can not found resource element: ${element}`);
        return document.createElement("div");
    }
    const resource = resourceMap.get(element);
    if (resource instanceof HTMLElement) {
        return resource;
    }
    else {
        console.warn(`css2D compiler can not suport render this resource type.`, resource.constructor, element);
        return document.createElement("div");
    }
};
export default defineProcessor({
    type: "CSS2DPlane",
    config: getCSS2DPlaneConfig,
    commands: {
        add: objectCommands.add,
        set: {
            element({ target, value, engine }) {
                target.element.innerHTML = "";
                target.element.appendChild(getElement(value, engine));
            },
            ...objectCommands.set,
        },
        delete: objectCommands.delete,
    },
    create(config, engine) {
        return objectCreate(new CSS2DPlane(getElement(config.element, engine)), config, {
            element: true,
        }, engine);
    },
    dispose: objectDispose,
});
