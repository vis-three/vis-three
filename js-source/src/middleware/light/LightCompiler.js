import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { Compiler } from "../../core/Compiler";
import AmbientLightProcessor from "./processor/AmbientLightProcessor";
import DirectionalLightProcessor from "./processor/DirectionalLightProcessor";
import PointLightProcessor from "./processor/PointLightProcessor";
import SpotLightProcessor from "./processor/SpotLightProcessor";
export class LightCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.LIGHT;
    constructor() {
        super();
    }
}
Compiler.processor(AmbientLightProcessor);
Compiler.processor(DirectionalLightProcessor);
Compiler.processor(PointLightProcessor);
Compiler.processor(SpotLightProcessor);
//# sourceMappingURL=LightCompiler.js.map