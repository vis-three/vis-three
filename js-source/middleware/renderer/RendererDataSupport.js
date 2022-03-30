import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererRule } from "./RendererRule";
export class RendererDataSupport extends DataSupport {
    MODULE = MODULETYPE.RENDERER;
    constructor(data) {
        !data && (data = {});
        super(RendererRule, data);
    }
}
//# sourceMappingURL=RendererDataSupport.js.map