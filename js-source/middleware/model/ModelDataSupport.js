import { DataSupport } from "../../core/DataSupport";
import { ModelRule } from "./ModelRule";
export class ModelDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {});
        super(ModelRule, data);
    }
}
//# sourceMappingURL=ModelDataSupport.js.map