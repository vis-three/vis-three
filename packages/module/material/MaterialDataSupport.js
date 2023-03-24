import { DataSupport } from "../module";
import { MODULETYPE } from "../constants";
import { MaterialRule } from "./MaterialRule";
export class MaterialDataSupport extends DataSupport {
    MODULE = MODULETYPE.MATERIAL;
    constructor(data = []) {
        super(MaterialRule, data);
    }
}
