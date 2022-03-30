import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { GeometryRule } from "./GeometryRule";
export class GeometryDataSupport extends DataSupport {
    MODULE = MODULETYPE.GEOMETRY;
    constructor(data) {
        !data && (data = {});
        super(GeometryRule, data);
    }
}
//# sourceMappingURL=GeometryDataSupport.js.map