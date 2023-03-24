import { CSS3DPlane } from "@vis-three/core";
import { getCSS3DPlaneConfig } from "./CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor, } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
export default defineProcessor({
    type: "CSS3DPlane",
    config: getCSS3DPlaneConfig,
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
        return objectCreate(new CSS3DPlane(getElement(config.element, engine)), config, {
            element: true,
        }, engine);
    },
    dispose: objectDispose,
});
