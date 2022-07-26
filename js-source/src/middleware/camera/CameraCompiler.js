import { ObjectCompiler } from "../object/ObjectCompiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { Compiler } from "../../core/Compiler";
import PerspectiveCameraProcessor from "./processor/PerspectiveCameraProcessor";
import OrthographicCameraProcessor from "./processor/OrthographicCameraProcessor";
export class CameraCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.CAMERA;
    constructor() {
        super();
    }
}
Compiler.processor(PerspectiveCameraProcessor);
Compiler.processor(OrthographicCameraProcessor);
//# sourceMappingURL=CameraCompiler.js.map