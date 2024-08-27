import { Compiler, CompilerParameters, EngineSupport, ModelOption } from "@vis-three/tdcm";
export declare class RendererCompiler extends Compiler<EngineSupport> {
    constructor(params: CompilerParameters);
    useModel(option: ModelOption<any, any, any, any, EngineSupport, Compiler<EngineSupport>>, callback?: ((compiler: this) => void) | undefined): this;
}
