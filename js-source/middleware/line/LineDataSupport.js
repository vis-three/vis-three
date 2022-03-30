import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { LineRule } from "./LineRule";
export class LineDataSupport extends DataSupport {
    MODULE = MODULETYPE.LINE;
    constructor(data) {
        !data && (data = {});
        super(LineRule, data);
    }
}
//# sourceMappingURL=LineDataSupport.js.map