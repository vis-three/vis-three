import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export class ObjectDataSupport extends DataSupport {
    MODULE = MODULETYPE.GROUP;
    constructor(rule, data, ignore) {
        !data && (data = Object.create(Object.prototype));
        super(rule, data, ignore);
    }
}
//# sourceMappingURL=ObjectDataSupport.js.map