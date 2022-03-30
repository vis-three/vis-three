import { DataSupport } from "../../core/DataSupport";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import { getSceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";
export class SceneDataSupport extends DataSupport {
    MODULE = MODULETYPE.SCENE;
    constructor(data) {
        !data && (data = {
            [CONFIGTYPE.SCENE]: getSceneConfig()
        });
        super(SceneRule, data);
    }
}
//# sourceMappingURL=SceneDataSupport.js.map