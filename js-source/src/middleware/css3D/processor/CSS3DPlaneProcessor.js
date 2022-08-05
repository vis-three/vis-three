import { defineProcessor } from "../../../core/Processor";
import { CSS3DPlane } from "../../../extends/object/CSS3DPlane";
import { CONFIGTYPE } from "../../constants/configType";
import { objectCommands, objectCreate, objectDispose, } from "../../object/ObjectProcessor";
import { getElement } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.CSS3DPLANE,
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
//# sourceMappingURL=CSS3DPlaneProcessor.js.map