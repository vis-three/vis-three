import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectCompiler } from "../object/ObjectCompiler";
import SceneProcessor from "./SceneProcessor";
export class SceneCompiler extends ObjectCompiler {
    MODULE = MODULETYPE.SCENE;
    constructor() {
        super();
    }
}
Compiler.processor(SceneProcessor);
//# sourceMappingURL=SceneCompiler.js.map