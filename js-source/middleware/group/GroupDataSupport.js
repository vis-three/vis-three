import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupRule } from "./GroupRule";
export class GroupDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.GROUP;
    constructor(data, ignore) {
        !data && (data = {});
        super(GroupRule, data, ignore);
    }
}
//# sourceMappingURL=GroupDataSupport.js.map