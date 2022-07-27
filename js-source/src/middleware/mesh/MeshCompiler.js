import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import MeshProcessor from "./MeshProcessor";
export class MeshCompiler extends SolidObjectCompiler {
    MODULE = MODULETYPE.MESH;
    constructor() {
        super();
    }
}
Compiler.processor(MeshProcessor);
//# sourceMappingURL=MeshCompiler.js.map