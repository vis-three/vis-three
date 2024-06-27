import { EngineSupport } from "../engine";
import { Compiler } from "./compiler";
import { Processor, ProcessorCommands } from "./processor";
import { Rule } from "./rule";
export * from "./compiler";
export * from "./dataContainer";
export * from "./dataSupport";
export * from "./observer";
export * from "./processor";
export * from "./rule";
export * from "./translater";
export * from "./common";
export * from "./space";
export interface ModuleOptions<C extends Compiler<any, any> = Compiler<any, any>, E extends EngineSupport = EngineSupport> {
    type: string;
    compiler: new () => C;
    rule: Rule<C>;
    processors: Processor<any, any, any, C>[];
    object?: boolean;
    extend?: (engine: E) => void;
    lifeOrder?: number;
    expand?: {
        processors: string[] | RegExp;
        command: ProcessorCommands<any, any, any, any>;
    }[];
}
