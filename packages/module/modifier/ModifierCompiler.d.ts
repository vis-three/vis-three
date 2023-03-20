import { Compiler } from "@vis-three/middleware";
import { Modifier } from "@vis-three/modifier-base";
import { ModifierAllType } from "./ModifierConfig";
export declare class ModifierCompiler extends Compiler<ModifierAllType, Modifier> {
    cacheRenderFun: Map<Modifier, any>;
    sourceModifiers: Map<object, Modifier[]>;
    constructor();
    integrateModifer(modifier: Modifier): void;
    chainRender(modifier: Modifier): void;
}
