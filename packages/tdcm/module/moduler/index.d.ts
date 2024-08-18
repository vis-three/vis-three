import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Rule, Ruler } from "../ruler";
import { Converter } from "../converter";
import { ModelOption } from "../model";
export interface ModuleOptions<E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    type: string;
    compiler?: new (...args: any[]) => O;
    rule?: Rule[];
    /**
     * @deprecated use models
     */
    processors?: ModelOption<any, any, any, any>[];
    models: ModelOption<any, any, any, any, E, O>[];
    resources?: LoadUnit[];
    object?: boolean;
    extend?: (engine: E) => void;
    lifeOrder?: number;
}
export declare class Moduler<E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    module: ModuleOptions<E, O>;
    type: string;
    converter: Converter<any, E, O>;
    compiler: O;
    ruler: Ruler;
    constructor(module: ModuleOptions<E, O>);
}
export declare const defineModule: <E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>>(module: ModuleOptions<E, O>) => ModuleOptions<E, O>;
