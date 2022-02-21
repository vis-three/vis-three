import { DataSupport } from "../../core/DataSupport";
import { EventRule } from "./EventRule";
export class EventDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(EventRule, data);
    }
}
//# sourceMappingURL=EventDataSupport.js.map