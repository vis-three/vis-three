import { objectDeepMerge } from "@vis-three/utils";
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
  /**模型类型 */
  type: string;
  /**模型的配置结构 */
  config: () => Cf;
  /**模型实例的共享属性方法 */
  shared?: Srd;
  /**模型实例的特有属性方法 */
  context?: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
    }
  ) => Ctx;
  /**模型的命令链 */
  commands?: ModelCommands<
    Cf,
    Obj,
    Eg,
    Cpl,
    Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx
  >;
  /**模型的生成方法 */
  create: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => Obj;
  /**模型的销毁方法 */
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
  /**该模型应用时对其他模型产生的扩展 */
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

    option.commands = objectDeepMerge(option.commands, abstract.commands);

    const optionContext = option.context;
    const abstractContext = abstract.context;

    option.context = function (params) {
      return Object.assign(
        abstractContext
          ? abstractContext(
              params as { model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx }
            )
          : {},
        optionContext ? optionContext.call(this, params) : {}
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

    abstractOption.commands = objectDeepMerge(
      abstractOption.commands,
      abstract.commands
    );

    const abstractContext = abstract.context;
    const abstractOptionContext = abstractOption.context;

    abstractOption.context = function (params) {
      return Object.assign(
        abstractContext
          ? abstractContext(
              params as { model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx }
            )
          : {},
        abstractOptionContext ? abstractOptionContext.call(this, params) : {}
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
