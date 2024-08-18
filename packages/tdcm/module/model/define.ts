import { EngineSupport } from "../../engine";
import { BasicConfig } from "../common";
import { Compiler } from "../compiler";
import { Model, ModelCommands } from "./Model";

export interface ModelOption<
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>
> {
  type: string;
  config: () => Cf;
  shared?: Srd;
  context?: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
    }
  ) => Ctx;
  commands?: ModelCommands<
    Cf,
    Obj,
    Eg,
    Cpl,
    Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx
  >;
  create: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => Obj;
  dispose: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      target: Obj;
      puppet: Obj;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => void;
}

export const defineModel = function <
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>
>(option: ModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl>) {
  return option;
};

export interface AbstractModelOption<
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>,
  Cra extends Function = Function,
  Dsp extends Function = Function
> {
  context?: (params: {
    model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
  }) => Ctx;
  commands?: ModelCommands<
    Cf,
    Obj,
    Eg,
    Cpl,
    Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx
  >;
  create?: Cra;
  dispose?: Dsp;
}

defineModel.extend = function <
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>,
  Cra extends Function = Function,
  Dsp extends Function = Function
>(abstract: AbstractModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl, Cra, Dsp>) {
  return function <
    ACf extends Cf = Cf,
    AObj extends Obj = Obj,
    ACtx extends object = object,
    ASrd extends object = object,
    AEg extends Eg = Eg,
    ACpl extends Compiler<AEg> = Compiler<AEg>
  >(
    fun: (
      abstract: AbstractModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl, Cra, Dsp>
    ) => ModelOption<ACf, AObj, ACtx, ASrd, AEg, ACpl>
  ): ModelOption<ACf, AObj, Ctx & ACtx, Srd & ASrd, AEg, ACpl> {
    const option = fun(abstract) as ModelOption<
      ACf,
      AObj,
      Ctx & ACtx,
      Srd & ASrd,
      AEg,
      ACpl
    >;

    // TODO: deep merge
    option.commands = Object.assign({}, abstract.commands, option.commands);

    option.context = function (params) {
      return Object.assign(
        abstract.context
          ? abstract.context(
              params as { model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx }
            )
          : {},
        option.context ? option.context.call(this, params) : {}
      ) as Ctx & ACtx;
    };

    return option;
  };
};

/**
 * @deprecated use defineModel
 */
export const defineProcessor = defineModel;
