import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsRule } from "./PointsRule";
export class PointsDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.POINTS;
    constructor(data, ignore) {
        !data && (data = {});
        super(PointsRule, data, ignore);
    }
}
//# sourceMappingURL=PointsDataSupport.js.map