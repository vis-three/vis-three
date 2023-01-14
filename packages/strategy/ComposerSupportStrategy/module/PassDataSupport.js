import { DataSupport, MODULETYPE } from "@vis-three/middleware";
import { PassRule } from "./PassRule";
export class PassDataSupport extends DataSupport {
    MODULE = MODULETYPE.PASS;
    constructor(data = []) {
        super(PassRule, data);
    }
}
