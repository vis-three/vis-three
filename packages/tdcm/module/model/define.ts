import { EngineSupport } from "../../engine";
import { BasicConfig } from "../common";
import { Compiler } from "../compiler";
import { Model, ModelCommands } from "./Model";

export interface ModelOption<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  D extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
> {
  type: string;
  config: () => C;
  context?: (
    this: Model<C, P, E> & D,
    params: { model: Model<C, P, E> & D }
  ) => D;
  commands?: ModelCommands<C, P, E, O, Model<C, P, E, O> & D>;
  create: (
    this: Model<C, P, E> & D,
    params: { model: Model<C, P, E> & D; config: C; engine: E; compiler: O }
  ) => P;
  dispose: (
    this: Model<C, P, E> & D,
    params: {
      model: Model<C, P, E> & D;
      target: P;
      puppet: P;
      config: C;
      engine: E;
      compiler: O;
    }
  ) => void;
}

export const defineModel = function <
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  D extends object = any,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
>(option: ModelOption<C, P, D, E, O>) {
  return option;
};

export interface AbstractModelOption<
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  D extends object = object,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Function = Function,
  I extends Function = Function
> {
  context?: (params: { model: Model<C, P, E> & D }) => D;
  commands?: ModelCommands<C, P, E, O, Model<C, P, E, O> & D>;
  create?: R;
  dispose?: I;
}

defineModel.extend = function <
  C extends BasicConfig = BasicConfig,
  P extends object = object,
  D extends object = any,
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>,
  R extends Function = Function,
  I extends Function = Function
>(abstract: AbstractModelOption<C, P, D, E, O, R, I>) {
  return function <
    AC extends C = C,
    AP extends P = P,
    AD extends object = any,
    AE extends E = E,
    AO extends O & Compiler<AE> = O & Compiler<AE>
  >(
    fun: (
      abstract: AbstractModelOption<C, P, D, E, O, R, I>
    ) => ModelOption<AC, AP, AD, AE, AO>
  ): ModelOption<AC, AP, D & AD, AE, AO> {
    const option = fun(abstract) as ModelOption<AC, AP, D & AD, AE, AO>;

    option.commands = Object.assign({}, abstract.commands, option.commands);

    option.context = function (params) {
      return Object.assign(
        abstract.context
          ? abstract.context(params as { model: Model<C, P, E> & D })
          : {},
        option.context ? option.context.call(this, params) : {}
      ) as D & AD;
    };

    return option;
  };
};

/**
 * @deprecated use defineModel
 */
export const defineProcessor = defineModel;
