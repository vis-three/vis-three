import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialRule } from "./MaterialRule";
export class MaterialDataSupport extends DataSupport {
    MODULE = MODULETYPE.MATERIAL;
    constructor(data) {
        !data && (data = {});
        super(MaterialRule, data);
    }
}
//# sourceMappingURL=MaterialDataSupport.js.map