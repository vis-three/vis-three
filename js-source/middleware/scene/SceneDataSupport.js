import { DataSupport } from "../../core/DataSupport";
import { CONFIGTYPE } from "../constants/configType";
import { getSceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";
export class SceneDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {
            [CONFIGTYPE.SCENE]: getSceneConfig()
        });
        super(SceneRule, data);
    }
}
//# sourceMappingURL=SceneDataSupport.js.map