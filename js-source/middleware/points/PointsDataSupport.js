import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsRule } from "./PointsRule";
export class PointsDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.POINTS;
    constructor(data) {
        !data && (data = {});
        super(PointsRule, data);
    }
}
//# sourceMappingURL=PointsDataSupport.js.map