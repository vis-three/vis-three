import { Compiler } from "@vis-three/middleware";
import { Modifier } from "@vis-three/modifier-base";
import { ModifierAllType } from "./ModifierConfig";
export declare class ModifierCompiler extends Compiler<ModifierAllType, Modifier> {
    cacheRenderFun: Map<Modifier, Function>;
    constructor();
}
