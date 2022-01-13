import { DataSupport } from "../../middleware/DataSupport";
import { getWebGLRendererConfig } from "./RendererConfig";
import { RendererRule } from "./RendererRule";
export class RendererDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {
            WebGLRenderer: getWebGLRendererConfig()
        });
        super(RendererRule, data);
    }
}
//# sourceMappingURL=RendererDataSupport.js.map