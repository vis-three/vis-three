import { Sprite, SpriteMaterial } from "three";
import { defineProcessor } from "../../core/Processor";
import { CONFIGTYPE } from "../constants/configType";
import { solidObjectCommands, solidObjectCreate, solidObjectDispose, } from "../solidObject/SolidObjectProcessor";
const spriteReplaceMaterial = new SpriteMaterial({
    color: "rgb(123, 123, 123)",
});
export default defineProcessor({
    configType: CONFIGTYPE.SPRITE,
    commands: {
        add: solidObjectCommands.add,
        set: {
            lookAt() { },
            ...solidObjectCommands.set,
            material({ target, engine, value }) {
                const material = engine.compilerManager.getMaterial(value);
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
        const material = engine.compilerManager.getMaterial(config.material);
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
//# sourceMappingURL=SpriteProcessor.js.map