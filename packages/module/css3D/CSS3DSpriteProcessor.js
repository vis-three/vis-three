import { CSS3DSprite } from "@vis-three/core";
import { getCSS3DSpriteConfig } from "./CSS3DConfig";
import { getElement } from "./common";
import { defineProcessor, } from "@vis-three/middleware";
import { objectCommands, objectCreate, objectDispose, } from "@vis-three/module-object";
export default defineProcessor({
    type: "CSS3DSprite",
    config: getCSS3DSpriteConfig,
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
        return objectCreate(new CSS3DSprite(getElement(config.element, engine)), config, {
            element: true,
        }, engine);
    },
    dispose: objectDispose,
});
