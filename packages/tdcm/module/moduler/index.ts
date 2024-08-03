import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Rule, Ruler } from "../ruler";
import { Converter } from "../converter";
import { BasicConfig } from "../common";
import { ModelOption } from "../model";

export interface ModuleOptions<
  C extends Compiler = Compiler,
  E extends EngineSupport = EngineSupport
> {
  type: string;
  compiler?: new (...args) => C;
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
  // expand?: {
  //   module: string[] | RegExp;
  //   command: ProcessorCommands<any, any, any, any>;
  // }[];
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
          models: module.models,
        })
      : (new Compiler({
          module: module.type,
          models: module.models,
        }) as C);

    this.converter = new Converter<B, C>({
      ruler: this.ruler,
    }).addCompiler(this.compiler);
  }
}

export const defineModule = function (module: ModuleOptions) {
  return module;
};
