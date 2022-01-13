import { DataSupport } from "../../middleware/DataSupport";
import { getSceneConfig } from "./SceneConfig";
import { SceneRule } from "./SceneRule";
export class SceneDataSupport extends DataSupport {
    constructor(data) {
        !data && (data = {
            scene: getSceneConfig()
        });
        super(SceneRule, data);
    }
}
//# sourceMappingURL=SceneDataSupport.js.map