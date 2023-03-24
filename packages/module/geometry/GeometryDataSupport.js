import { DataSupport } from "../module";
import { MODULETYPE } from "../constants";
import { GeometryRule } from "./GeometryRule";
export class GeometryDataSupport extends DataSupport {
    MODULE = MODULETYPE.GEOMETRY;
    constructor(data = []) {
        super(GeometryRule, data);
    }
}
