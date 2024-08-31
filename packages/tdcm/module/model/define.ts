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
  expand?: [
    {
      models: string | string[] | RegExp;
      config: () => object;
      commands: ModelCommands<any, any, any, any, any>;
    }
  ];
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
  shared?: Srd;
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
  const extendFun = function <
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

    option.shared = Object.assign({}, abstract.shared, option.shared);

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

  extendFun.extend = function <
    ECf extends Cf = Cf,
    EObj extends Obj = Obj,
    ECtx extends object = object,
    ESrd extends object = object,
    EEg extends Eg = Eg,
    ECpl extends Compiler<EEg> = Compiler<EEg>,
    ECra extends Function = Function,
    EDsp extends Function = Function
  >(
    fun: (
      abstract: AbstractModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl, Cra, Dsp>
    ) => AbstractModelOption<ECf, EObj, ECtx, ESrd, EEg, ECpl, ECra, EDsp>
  ) {
    const abstractOption = fun(abstract) as AbstractModelOption<
      ECf,
      EObj,
      Ctx & ECtx,
      Srd & ESrd,
      EEg,
      ECpl,
      ECra,
      EDsp
    >;

    abstractOption.shared = Object.assign(
      {},
      abstract.shared,
      abstractOption.shared
    );

    // TODO: deep merge
    abstractOption.commands = Object.assign(
      {},
      abstract.commands,
      abstractOption.commands
    );

    abstractOption.context = function (params) {
      return Object.assign(
        abstract.context
          ? abstract.context(
              params as { model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx }
            )
          : {},
        abstractOption.context ? abstractOption.context.call(this, params) : {}
      ) as Ctx & ECtx;
    };

    return defineModel.extend<
      ECf,
      EObj,
      Ctx & ECtx,
      Srd & ESrd,
      EEg,
      ECpl,
      ECra,
      EDsp
    >(abstractOption);
  };

  return extendFun;
};

defineModel.expand = function <
  EC extends object = {},
  ECf extends BasicConfig = BasicConfig,
  EObj extends object = object,
  ECtx extends object = object,
  ESrd extends object = object,
  EEg extends EngineSupport = EngineSupport,
  ECpl extends Compiler<EEg> = Compiler<EEg>
>(expandOption: {
  models: string | string[] | RegExp;
  config: EC;
  commands: ModelCommands<
    EC & ECf,
    EObj,
    EEg,
    ECpl,
    Model<EC & ECf, EObj, EEg, ECpl> & Readonly<ESrd> & ECtx
  >;
}) {
  return expandOption;
};

/**
 * @deprecated use defineModel
 */
export const defineProcessor = defineModel;
