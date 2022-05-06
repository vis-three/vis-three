import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CSS3DRule } from "./CSS3DRule";
export class CSS3DDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.CSS3D;
    constructor(data) {
        !data && (data = {});
        super(CSS3DRule, data);
    }
}
//# sourceMappingURL=CSS3DDataSupport.js.map