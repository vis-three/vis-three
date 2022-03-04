import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { PointsRule } from "./PointsRule";
export class PointsDataSupport extends ObjectDataSupport {
    constructor(data) {
        !data && (data = {});
        super(PointsRule, data);
    }
}
//# sourceMappingURL=PointsDataSupport.js.map