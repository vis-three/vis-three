import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { PointsRule } from "./PointsRule";
export class PointsDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.POINTS;
    constructor(data) {
        !data && (data = {});
        super(PointsRule, data);
    }
}
//# sourceMappingURL=PointsDataSupport.js.map