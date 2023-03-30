import { EngineSupport } from "../engine";
import { Compiler } from "./compiler";
import { Processor } from "./processor";
import { Rule } from "./rule";

export * from "./compiler";
export * from "./dataContainer";
export * from "./dataSupport";
export * from "./observable";
export * from "./processor";
export * from "./rule";
export * from "./translater";
export * from "./common";
export * from "./space";

export interface ModuleOptions<C extends Compiler<any, any>> {
  type: string;
  compiler: new () => C;
  rule: Rule<C>;
  processors: Processor<any, any, any, C>[];
  object?: boolean;
  extend?: <E extends EngineSupport>(engine: E) => void;
  lifeOrder?: number;
}
