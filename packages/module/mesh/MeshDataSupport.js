import { MODULETYPE } from "../constants";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { MeshRule } from "./MeshRule";
export class MeshDataSupport extends SolidObjectDataSupport {
    MODULE = MODULETYPE.MESH;
    constructor(data = []) {
        super(MeshRule, data);
    }
}
