import { Compiler } from "@vis-three/middleware";
export class ModifierCompiler extends Compiler {
    cacheRenderFun = new Map();
    constructor() {
        super();
    }
}
