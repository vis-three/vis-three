import { MODULETYPE } from "../constants";
import { Compiler } from "../module";
export class ControlsCompiler extends Compiler {
    MODULE = MODULETYPE.CONTROLS;
    constructor() {
        super();
    }
}
