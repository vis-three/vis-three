import { DataSupport } from "../../middleware/DataSupport";
import { GeometryRule } from "./GeometryRule";
export class GeometryDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(GeometryRule, data);
    }
}
//# sourceMappingURL=GeometryDataSupport.js.map