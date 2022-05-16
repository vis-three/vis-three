import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { LineRule } from "./LineRule";
export class LineDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.LINE;
    constructor(data, ignore) {
        !data && (data = {});
        super(LineRule, data, ignore);
    }
}
//# sourceMappingURL=LineDataSupport.js.map