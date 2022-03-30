import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { GroupRule } from "./GroupRule";
export class GroupDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.GROUP;
    constructor(data) {
        !data && (data = {});
        super(GroupRule, data);
    }
}
//# sourceMappingURL=GroupDataSupport.js.map