import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { SceneRule } from "./SceneRule";
export class SceneDataSupport extends ObjectDataSupport {
    MODULE = MODULETYPE.SCENE;
    constructor(data) {
        !data && (data = {});
        super(SceneRule, data);
    }
}
//# sourceMappingURL=SceneDataSupport.js.map