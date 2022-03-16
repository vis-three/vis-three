import { DataSupport } from "../../core/DataSupport";
import { RendererRule } from "./RendererRule";
export class RendererDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(RendererRule, data);
    }
}
//# sourceMappingURL=RendererDataSupport.js.map