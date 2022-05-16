import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export class SolidObjectDataSupport extends DataSupport {
    MODULE = MODULETYPE.MESH;
    constructor(rule, data, ignore) {
        !data && (data = Object.create(Object.prototype));
        super(rule, data, ignore);
    }
}
//# sourceMappingURL=SolidDataSupport.js.map