import { DataSupport } from "../../core/DataSupport";
import { LineRule } from "./LineRule";
export class LineDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(LineRule, data);
    }
}
//# sourceMappingURL=LineDataSupport.js.map