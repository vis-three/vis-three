import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { MeshRule } from "./MeshRule";
export class MeshDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.MESH;
    constructor(data) {
        !data && (data = {});
        super(MeshRule, data);
    }
}
//# sourceMappingURL=MeshDataSupport.js.map