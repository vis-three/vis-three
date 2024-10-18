import { LoadUnit } from "@vis-three/plugin-loader-manager";
import { EngineSupport } from "../../engine";
import { Compiler } from "../compiler";
import { Rule, Ruler } from "../ruler";
import { Converter } from "../converter";
import { ModelOption } from "../model";

export interface ModuleOptions<
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
> {
  /** 模块类型 建议为小驼峰*/
  type: string;
  /** 模块的编译器 */
  compiler?: new (...args) => O;
  /** 模块的编译规则 */
  rule?: Rule[];
  /** 模块所包含的配置化模型 */
  models: ModelOption<any, any, any, any, E, O>[];
  resources?: LoadUnit[];
  /** 是否为一个物体模块 */
  object?: boolean;
  /** 安装该模块对engine产生的扩展 */
  extend?: (engine: E) => void;
  /** 模块的生命周期顺序 */
  lifeOrder?: number;
}

export class Moduler<
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
> {
  module: ModuleOptions<E, O>;

  type: string = "";
  converter: Converter<any, E, O>;
  compiler: O;
  ruler: Ruler;

  constructor(module: ModuleOptions<E, O>) {
    this.module = module;

    this.type = module.type;

    this.ruler = new Ruler(module.rule);

    this.compiler = module.compiler
      ? new module.compiler({
          module: module.type,
          models: module.models,
        })
      : (new Compiler<E>({
          module: module.type,
          models: module.models as ModelOption<
            any,
            any,
            any,
            any,
            E,
            Compiler<E>
          >[],
        }) as O);

    this.converter = new Converter<any, E, O>({
      module: module.type,
      ruler: this.ruler,
    }).addCompiler(this.compiler);
  }
}

/**
 * 定义一个模块
 * @param module 模块选项moduleOptions
 * @returns
 */
export const defineModule = function <
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
>(module: ModuleOptions<E, O>) {
  return module;
};
