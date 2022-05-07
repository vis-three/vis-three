import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererRule } from "./RendererRule";
export class RendererDataSupport extends DataSupport {
    MODULE = MODULETYPE.RENDERER;
    constructor(data, ignore) {
        !data && (data = {});
        super(RendererRule, data, ignore);
    }
}
//# sourceMappingURL=RendererDataSupport.js.map