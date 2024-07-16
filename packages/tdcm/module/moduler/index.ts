import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Processor, ProcessorCommands } from "../processor";
import { Ruler } from "../ruler";

export interface ModuleOptions<
  C extends Compiler = Compiler,
  E extends EngineSupport = EngineSupport
> {
  type: string;
  compiler: Compiler;
  //@deprecated use ruler
  rule: Ruler;
  ruler: Ruler;
  processors: Processor<any, any, E, C>[];
  preload?: LoadUnit[];
  object?: boolean;
  extend?: (engine: E) => void;
  lifeOrder?: number;
  expand?: {
    processors: string[] | RegExp;
    command: ProcessorCommands<any, any, any, any>;
  }[];
}

export class Moduler {
  module: ModuleOptions;

  constructor(module: ModuleOptions) {
    this.module = module;
  }
}

export const defineModule = function(module: ModuleOptions) {
}
