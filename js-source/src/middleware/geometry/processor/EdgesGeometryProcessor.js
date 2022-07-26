import { BoxBufferGeometry, BufferGeometry, EdgesGeometry } from "three";
import { defineProcessor } from "../../../core/Processor";
import { CONFIGTYPE } from "../../constants/configType";
import { commands, create } from "./common";
export default defineProcessor({
    configType: CONFIGTYPE.EDGESGEOMETRY,
    commands: commands,
    create(config, engine) {
        const geometry = engine.compilerManager.getObjectBySymbol(config.url);
        if (!geometry || !(geometry instanceof BufferGeometry)) {
            console.error(`engine rescoure can not found url: ${config.url}`);
            return new EdgesGeometry(new BoxBufferGeometry(5, 5, 5));
        }
        return create(new EdgesGeometry(geometry), config);
    },
    dispose(target) {
        target.dispose();
    },
});
//# sourceMappingURL=EdgesGeometryProcessor.js.map