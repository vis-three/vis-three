import { Compiler, CompilerParameters, EngineSupport } from "@vis-three/tdcm";
import { Modifier } from "@vis-three/modifier-base";
export declare class ModifierCompiler extends Compiler<EngineSupport> {
    cacheRenderFun: Map<Modifier, any>;
    sourceModifiers: Map<object, Modifier[]>;
    constructor(params: CompilerParameters);
    integrateModifer(modifier: Modifier): void;
    chainRender(modifier: Modifier): void;
}
