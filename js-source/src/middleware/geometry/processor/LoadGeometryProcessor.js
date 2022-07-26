import { BoxBufferGeometry, BufferGeometry } from "three";
import { defineProcessor } from "../../../core/Processor";
import { LoadGeometry } from "../../../extends/geometry/LoadGeometry";
import { CONFIGTYPE } from "../../constants/configType";
import { commands, create } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.LOADGEOMETRY,
    commands: commands,
    create(config, engine) {
        const originGeometry = engine.resourceManager.resourceMap.get(config.url);
        if (!originGeometry && !(originGeometry instanceof BufferGeometry)) {
            console.error(`engine rescoure can not found url: ${config.url}`);
            return new BoxBufferGeometry(5, 5, 5);
        }
        return create(new LoadGeometry(originGeometry), config);
    },
    dispose(target) {
        target.dispose();
    },
});
//# sourceMappingURL=LoadGeometryProcessor.js.map