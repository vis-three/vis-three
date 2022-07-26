import { Compiler } from "../../core/Compiler";
import { CONFIGTYPE } from "../constants/configType";
import { MODULETYPE } from "../constants/MODULETYPE";
import OrbitControlsProcessor from "./processor/OrbitControlsProcessor";
import TransformControlsProcessor from "./processor/TransformControlsProcessor";
export class ControlsCompiler extends Compiler {
    MODULE = MODULETYPE.CONTROLS;
    constructor() {
        super();
    }
    useEngine(engine) {
        if (engine.transformControls) {
            this.map.set(CONFIGTYPE.TRNASFORMCONTROLS, engine.transformControls);
            this.weakMap.set(engine.transformControls, CONFIGTYPE.TRNASFORMCONTROLS);
        }
        if (engine.orbitControls) {
            this.map.set(CONFIGTYPE.ORBITCONTROLS, engine.orbitControls);
            this.weakMap.set(engine.orbitControls, CONFIGTYPE.ORBITCONTROLS);
        }
        return super.useEngine(engine);
    }
}
Compiler.processor(OrbitControlsProcessor);
Compiler.processor(TransformControlsProcessor);
//# sourceMappingURL=ControlsCompiler.js.map