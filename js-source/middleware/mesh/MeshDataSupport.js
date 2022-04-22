import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshRule } from "./MeshRule";
export class MeshDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.MESH;
    constructor(data) {
        !data && (data = {});
        super(MeshRule, data);
    }
}
//# sourceMappingURL=MeshDataSupport.js.map