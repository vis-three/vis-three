import { Compiler, CompilerParameters, ModelOption } from "@vis-three/tdcm";
export declare class ControlsCompiler extends Compiler<any> {
    constructor(params: CompilerParameters);
    useModel(option: ModelOption<any, any, any, any>, callback?: (compiler: this) => void): this;
    /**
     * @deprecated
     * @param processor
     * @param fun
     * @returns
     */
    reigstProcessor(option: ModelOption<any, any, any, any>, callback?: (compiler: this) => void): this;
}
