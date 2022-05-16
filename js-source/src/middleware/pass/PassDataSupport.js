import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { PassRule } from "./PassRule";
export class PassDataSupport extends DataSupport {
    MODULE = MODULETYPE.PASS;
    constructor(data, ignore) {
        !data && (data = {});
        super(PassRule, data, ignore);
    }
}
//# sourceMappingURL=PassDataSupport.js.map