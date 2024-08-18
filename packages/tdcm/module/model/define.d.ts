import { EngineSupport } from "../../engine";
import { BasicConfig } from "../common";
import { Compiler } from "../compiler";
import { Model, ModelCommands } from "./Model";
export interface ModelOption<Cf extends BasicConfig = BasicConfig, Obj extends object = object, Ctx extends object = object, Srd extends object = object, Eg extends EngineSupport = EngineSupport, Cpl extends Compiler<Eg> = Compiler<Eg>> {
    type: string;
    config: () => Cf;
    shared?: Srd;
    context?: (this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx, params: {
        model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
    }) => Ctx;
    commands?: ModelCommands<Cf, Obj, Eg, Cpl, Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx>;
    create: (this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx, params: {
        model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
        config: Cf;
        engine: Eg;
        compiler: Cpl;
    }) => Obj;
    dispose: (this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx, params: {
        model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
        target: Obj;
        puppet: Obj;
        config: Cf;
        engine: Eg;
        compiler: Cpl;
    }) => void;
}
export declare const defineModel: {
    <Cf extends BasicConfig = BasicConfig, Obj extends object = object, Ctx extends object = object, Srd extends object = object, Eg extends EngineSupport = EngineSupport, Cpl extends Compiler<Eg> = Compiler<Eg>>(option: ModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl>): ModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl>;
    extend<Cf_1 extends BasicConfig = BasicConfig, Obj_1 extends object = object, Ctx_1 extends object = object, Srd_1 extends object = object, Eg_1 extends EngineSupport = EngineSupport, Cpl_1 extends Compiler<Eg_1> = Compiler<Eg_1>, Cra extends Function = Function, Dsp extends Function = Function>(abstract: AbstractModelOption<Cf_1, Obj_1, Ctx_1, Srd_1, Eg_1, Cpl_1, Cra, Dsp>): <ACf extends Cf_1 = Cf_1, AObj extends Obj_1 = Obj_1, ACtx extends object = object, ASrd extends object = object, AEg extends Eg_1 = Eg_1, ACpl extends Compiler<AEg> = Compiler<AEg>>(fun: (abstract: AbstractModelOption<Cf_1, Obj_1, Ctx_1, Srd_1, Eg_1, Cpl_1, Cra, Dsp>) => ModelOption<ACf, AObj, ACtx, ASrd, AEg, ACpl>) => ModelOption<ACf, AObj, Ctx_1 & ACtx, Srd_1 & ASrd, AEg, ACpl>;
};
export interface AbstractModelOption<Cf extends BasicConfig = BasicConfig, Obj extends object = object, Ctx extends object = object, Srd extends object = object, Eg extends EngineSupport = EngineSupport, Cpl extends Compiler<Eg> = Compiler<Eg>, Cra extends Function = Function, Dsp extends Function = Function> {
    context?: (params: {
        model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
    }) => Ctx;
    commands?: ModelCommands<Cf, Obj, Eg, Cpl, Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx>;
    create?: Cra;
    dispose?: Dsp;
}
/**
 * @deprecated use defineModel
 */
export declare const defineProcessor: {
    <Cf extends BasicConfig = BasicConfig, Obj extends object = object, Ctx extends object = object, Srd extends object = object, Eg extends EngineSupport = EngineSupport, Cpl extends Compiler<Eg> = Compiler<Eg>>(option: ModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl>): ModelOption<Cf, Obj, Ctx, Srd, Eg, Cpl>;
    extend<Cf_1 extends BasicConfig = BasicConfig, Obj_1 extends object = object, Ctx_1 extends object = object, Srd_1 extends object = object, Eg_1 extends EngineSupport = EngineSupport, Cpl_1 extends Compiler<Eg_1> = Compiler<Eg_1>, Cra extends Function = Function, Dsp extends Function = Function>(abstract: AbstractModelOption<Cf_1, Obj_1, Ctx_1, Srd_1, Eg_1, Cpl_1, Cra, Dsp>): <ACf extends Cf_1 = Cf_1, AObj extends Obj_1 = Obj_1, ACtx extends object = object, ASrd extends object = object, AEg extends Eg_1 = Eg_1, ACpl extends Compiler<AEg> = Compiler<AEg>>(fun: (abstract: AbstractModelOption<Cf_1, Obj_1, Ctx_1, Srd_1, Eg_1, Cpl_1, Cra, Dsp>) => ModelOption<ACf, AObj, ACtx, ASrd, AEg, ACpl>) => ModelOption<ACf, AObj, Ctx_1 & ACtx, Srd_1 & ASrd, AEg, ACpl>;
};
