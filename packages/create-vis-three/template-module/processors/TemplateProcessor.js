import { defineProcessor, } from "@vis-three/middleware";
import { getTemplateConfig } from "../TemplateConfig";
export default defineProcessor({
    type: "templateObject",
    config: getTemplateConfig,
    commands: {
        add: {},
        set: {},
        delete: {},
    },
    create(config, engine) {
        return {};
    },
    dispose() { },
});
