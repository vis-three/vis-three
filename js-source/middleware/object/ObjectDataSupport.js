import { DataSupport } from "../../core/DataSupport";
export class ObjectDataSupport extends DataSupport {
    IS_OBJECTDATASUPPORT = true;
    constructor(rule, data) {
        !data && (data = Object.create(Object.prototype));
        super(rule, data);
    }
}
//# sourceMappingURL=ObjectDataSupport.js.map