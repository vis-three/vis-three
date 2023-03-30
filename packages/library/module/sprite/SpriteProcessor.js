import { defineProcessor, MODULETYPE, } from "@vis-three/middleware";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "@vis-three/module-solid-object";
import { Sprite, SpriteMaterial } from "three";
import { getSpriteConfig } from "./SpriteConfig";
const spriteReplaceMaterial = new SpriteMaterial({
    color: "rgb(123, 123, 123)",
});
export default defineProcessor({
    type: "Sprite",
    config: getSpriteConfig,
    commands: {
        add: solidObjectCommands.add,
        set: {
            lookAt() { },
            ...solidObjectCommands.set,
            material({ target, engine, value }) {
                const material = engine.compilerManager.getObjectfromModule(MODULETYPE.MATERIAL, value);
                if (material && material instanceof SpriteMaterial) {
                    target.material = material;
                }
                else {
                    target.material = spriteReplaceMaterial;
                }
            },
        },
        delete: solidObjectCommands.add,
    },
    create(config, engine) {
        const sprite = new Sprite();
        const material = engine.compilerManager.getObjectfromModule(MODULETYPE.MATERIAL, config.material);
        if (material && material instanceof SpriteMaterial) {
            sprite.material = material;
        }
        else {
            sprite.material = spriteReplaceMaterial;
        }
        return solidObjectCreate(sprite, config, {
            geometry: true,
            material: true,
            lookAt: true,
        }, engine);
    },
    dispose: solidObjectDispose,
});
