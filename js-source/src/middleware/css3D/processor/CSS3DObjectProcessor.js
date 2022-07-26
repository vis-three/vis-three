import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { objectCommands, objectCreate, objectDispose, } from "../../object/ObjectProcessor";
import { getElement } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.CSS3DOBJECT,
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
//# sourceMappingURL=CSS3DObjectProcessor.js.map