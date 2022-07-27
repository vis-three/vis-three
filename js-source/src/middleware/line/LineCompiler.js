import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import LineProcessor from "./LineProcessor";
export class LineCompiler extends SolidObjectCompiler {
    MODULE = MODULETYPE.LINE;
    constructor() {
        super();
    }
}
Compiler.processor(LineProcessor);
//# sourceMappingURL=LineCompiler.js.map