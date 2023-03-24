import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { getCSS3DObjectConfig } from "./CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
export default defineProcessor({
    type: "CSS3DObject",
    config: getCSS3DObjectConfig,
    commands: {
        add: objectCommands.add,
        set: {
            element({ target, value, engine }) {
                target.element = getElement(value, engine);
            },
            ...objectCommands.set,
        },
        delete: objectCommands.delete,
    },
    create(config, engine) {
        return objectCreate(new CSS3DObject(getElement(config.element, engine)), config, {
            element: true,
        }, engine);
    },
    dispose: objectDispose,
});
