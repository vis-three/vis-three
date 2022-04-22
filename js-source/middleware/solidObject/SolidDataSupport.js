import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export class SolidObjectDataSupport extends DataSupport {
    MODULE = MODULETYPE.MESH;
    constructor(rule, data) {
        !data && (data = Object.create(Object.prototype));
        super(rule, data);
    }
}
//# sourceMappingURL=SolidDataSupport.js.map