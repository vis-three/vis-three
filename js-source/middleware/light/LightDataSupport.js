import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { LightRule } from "./LightRule";
export class LightDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.LIGHT;
    constructor(data) {
        !data && (data = {});
        super(LightRule, data);
    }
}
//# sourceMappingURL=LightDataSupport.js.map