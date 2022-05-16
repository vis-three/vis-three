import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshRule } from "./MeshRule";
export class MeshDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.MESH;
    constructor(data, ignore) {
        !data && (data = {});
        super(MeshRule, data, ignore);
    }
}
//# sourceMappingURL=MeshDataSupport.js.map