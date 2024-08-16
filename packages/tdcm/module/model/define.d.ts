import { EngineSupport } from "../../engine";
import { BasicConfig } from "../common";
import { Compiler } from "../compiler";
import { Model, ModelCommands } from "./Model";
export interface ModelOption<C extends BasicConfig = BasicConfig, P extends object = object, D extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>> {
    type: string;
    config: () => C;
    context?: (this: Model<C, P, E> & D, params: {
        model: Model<C, P, E> & D;
    }) => D;
    commands?: ModelCommands<C, P, E, O, Model<C, P, E, O> & D>;
    create: (this: Model<C, P, E> & D, params: {
        model: Model<C, P, E> & D;
        config: C;
        engine: E;
        compiler: O;
    }) => P;
    dispose: (this: Model<C, P, E> & D, params: {
        model: Model<C, P, E> & D;
        target: P;
        puppet: P;
        config: C;
        engine: E;
        compiler: O;
    }) => void;
}
export declare const defineModel: {
    <C extends BasicConfig = BasicConfig, P extends object = object, D extends object = any, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>>(option: ModelOption<C, P, D, E, O>): ModelOption<C, P, D, E, O>;
    extend<C_1 extends BasicConfig = BasicConfig, P_1 extends object = object, D_1 extends object = any, E_1 extends EngineSupport = EngineSupport, O_1 extends Compiler<E_1> = Compiler<E_1>, R extends Function = Function, I extends Function = Function>(abstract: AbstractModelOption<C_1, P_1, D_1, E_1, O_1, R, I>): <AC extends C_1 = C_1, AP extends P_1 = P_1, AD extends object = any, AE extends E_1 = E_1, AO extends Compiler<AE> = Compiler<AE>>(fun: (abstract: AbstractModelOption<C_1, P_1, D_1, E_1, O_1, R, I>) => ModelOption<AC, AP, AD, AE, AO>) => ModelOption<AC, AP, D_1 & AD, AE, AO>;
};
export interface AbstractModelOption<C extends BasicConfig = BasicConfig, P extends object = object, D extends object = object, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>, R extends Function = Function, I extends Function = Function> {
    context?: (params: {
        model: Model<C, P, E> & D;
    }) => D;
    commands?: ModelCommands<C, P, E, O, Model<C, P, E, O> & D>;
    create?: R;
    dispose?: I;
}
/**
 * @deprecated use defineModel
 */
export declare const defineProcessor: {
    <C extends BasicConfig = BasicConfig, P extends object = object, D extends object = any, E extends EngineSupport = EngineSupport, O extends Compiler<E> = Compiler<E>>(option: ModelOption<C, P, D, E, O>): ModelOption<C, P, D, E, O>;
    extend<C_1 extends BasicConfig = BasicConfig, P_1 extends object = object, D_1 extends object = any, E_1 extends EngineSupport = EngineSupport, O_1 extends Compiler<E_1> = Compiler<E_1>, R extends Function = Function, I extends Function = Function>(abstract: AbstractModelOption<C_1, P_1, D_1, E_1, O_1, R, I>): <AC extends C_1 = C_1, AP extends P_1 = P_1, AD extends object = any, AE extends E_1 = E_1, AO extends Compiler<AE> = Compiler<AE>>(fun: (abstract: AbstractModelOption<C_1, P_1, D_1, E_1, O_1, R, I>) => ModelOption<AC, AP, AD, AE, AO>) => ModelOption<AC, AP, D_1 & AD, AE, AO>;
};
