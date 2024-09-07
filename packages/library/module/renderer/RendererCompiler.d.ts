import { Compiler, CompilerParameters, ModelOption } from "@vis-three/tdcm";
export declare class RendererCompiler extends Compiler<any> {
    constructor(params: CompilerParameters);
    useModel(option: ModelOption<any, any, any, any, any, Compiler<any>>, callback?: ((compiler: this) => void) | undefined): this;
}
