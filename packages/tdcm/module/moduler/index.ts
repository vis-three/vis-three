import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Processor, ProcessorCommands } from "../processor";
import { Rule, Ruler } from "../ruler";
import { Converter } from "../converter";
import { BasicConfig } from "../common";

export interface ModuleOptions<
  C extends Compiler = Compiler,
  E extends EngineSupport = EngineSupport
> {
  type: string;
  compiler: new (...args) => C;
  rule: Rule[];
  processors: Processor<any, any, E, C>[];
  resources?: LoadUnit[];
  object?: boolean;
  extend?: (engine: E) => void;
  lifeOrder?: number;
  expand?: {
    processors: string[] | RegExp;
    command: ProcessorCommands<any, any, any, any>;
  }[];
}

export class Moduler<
  B extends BasicConfig,
  C extends Compiler = Compiler,
  E extends EngineSupport = EngineSupport
> {
  module: ModuleOptions<C, E>;

  type: string = "";
  converter: Converter<B, C>;
  compiler: C;

  constructor(module: ModuleOptions<C, E>) {
    this.module = module;

    this.type = module.type;

    this.compiler = new module.compiler({
      processors: module.processors,
    });

    this.converter = new Converter<B, C>({
      ruler: new Ruler(module.rule),
    }).addCompiler(this.compiler);
  }
}

export const defineModule = function (module: ModuleOptions) {
  return module;
};
