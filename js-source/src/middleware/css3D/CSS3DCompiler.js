import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import CSS3DObjectProcessor from "./processor/CSS3DObjectProcessor";
import CSS3DPlaneProcessor from "./processor/CSS3DPlaneProcessor";
export class CSS3DCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.CSS3D;
    constructor() {
        super();
    }
}
Compiler.processor(CSS3DPlaneProcessor);
Compiler.processor(CSS3DObjectProcessor);
//# sourceMappingURL=CSS3DCompiler.js.map