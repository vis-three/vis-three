import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import SpriteProcessor from "./SpriteProcessor";
export class SpriteCompiler extends SolidObjectCompiler {
    MODULE = MODULETYPE.SPRITE;
    constructor() {
        super();
    }
}
Compiler.processor(SpriteProcessor);
//# sourceMappingURL=SpriteCompiler.js.map