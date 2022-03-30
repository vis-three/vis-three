import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { EventRule } from "./EventRule";
export class EventDataSupport extends DataSupport {
    MODULE = MODULETYPE.EVENT;
    constructor(data) {
        !data && (data = {});
        super(EventRule, data);
    }
}
//# sourceMappingURL=EventDataSupport.js.map