import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, } from "../solidObject/SolidObjectCompiler";
import PointsProcessor from "./PointsProcessor";
export class PointsCompiler extends SolidObjectCompiler {
    MODULE = MODULETYPE.POINTS;
    constructor() {
        super();
    }
}
Compiler.processor(PointsProcessor);
//# sourceMappingURL=PointsCompiler.js.map