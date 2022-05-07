import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryRule } from "./GeometryRule";
export class GeometryDataSupport extends DataSupport {
    MODULE = MODULETYPE.GEOMETRY;
    constructor(data, ignore) {
        !data && (data = {});
        super(GeometryRule, data, ignore);
    }
}
//# sourceMappingURL=GeometryDataSupport.js.map