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
  compiler?: new (...args) => C;
  rule?: Rule[];
  processors: Processor<any, any, E, C>[];
  resources?: LoadUnit[];
  object?: boolean;
  extend?: (engine: E) => void;
  lifeOrder?: number;
  expand?: {
    module: string[] | RegExp;
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
  ruler: Ruler;

  constructor(module: ModuleOptions<C, E>) {
    this.module = module;

    this.type = module.type;

    this.ruler = new Ruler(module.rule);

    this.compiler = module.compiler
      ? new module.compiler({
          module: module.type,
          processors: module.processors,
        })
      : (new Compiler({
          module: module.type,
          processors: module.processors,
        }) as C);

    this.converter = new Converter<B, C>({
      ruler: this.ruler,
    }).addCompiler(this.compiler);
  }
}

export const defineModule = function (module: ModuleOptions) {
  return module;
};
