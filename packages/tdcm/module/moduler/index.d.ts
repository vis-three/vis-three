import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Rule, Ruler } from "../ruler";
import { Converter } from "../converter";
import { BasicConfig } from "../common";
import { ModelOption } from "../model";
export interface ModuleOptions<C extends Compiler = Compiler, E extends EngineSupport = EngineSupport> {
    type: string;
    compiler?: new (...args: any[]) => C;
    rule?: Rule[];
    /**
     * @deprecated use models
     */
    processors: ModelOption<any, any, any, any>[];
    models: ModelOption<any, any, any, any>[];
    resources?: LoadUnit[];
    object?: boolean;
    extend?: (engine: E) => void;
    lifeOrder?: number;
}
export declare class Moduler<B extends BasicConfig, C extends Compiler = Compiler, E extends EngineSupport = EngineSupport> {
    module: ModuleOptions<C, E>;
    type: string;
    converter: Converter<B, C>;
    compiler: C;
    ruler: Ruler;
    constructor(module: ModuleOptions<C, E>);
}
export declare const defineModule: (module: ModuleOptions) => ModuleOptions<Compiler<EngineSupport, import("../model").Model<any, any, EngineSupport>>, EngineSupport>;
