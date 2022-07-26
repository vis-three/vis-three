import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ParametricGeometryProcessors } from "./processor/ParametricGeometryProcessors";
import LoadGeometryProcessor from "./processor/LoadGeometryProcessor";
import CustomGeometryProcessor from "./processor/CustomGeometryProcessor";
import EdgesGeometryProcessor from "./processor/EdgesGeometryProcessor";
export class GeometryCompiler extends Compiler {
    MODULE = MODULETYPE.GEOMETRY;
    constructor() {
        super();
    }
}
ParametricGeometryProcessors.forEach((processor) => {
    Compiler.processor(processor);
});
Compiler.processor(LoadGeometryProcessor);
Compiler.processor(CustomGeometryProcessor);
Compiler.processor(EdgesGeometryProcessor);
//# sourceMappingURL=GeometryCompiler.js.map