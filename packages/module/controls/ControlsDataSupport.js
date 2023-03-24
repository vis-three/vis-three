import { DataSupport } from "../module";
import { MODULETYPE } from "../constants";
import { ControlsRule } from "./ControlsRule";
export class ControlsDataSupport extends DataSupport {
    MODULE = MODULETYPE.CONTROLS;
    constructor(data = []) {
        super(ControlsRule, data);
    }
}
