import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { MeshRule } from "./MeshRule";
export class MeshDataSupport extends ObjectDataSupport {
    constructor(data) {
        !data && (data = {});
        super(MeshRule, data);
    }
}
//# sourceMappingURL=MeshDataSupport.js.map