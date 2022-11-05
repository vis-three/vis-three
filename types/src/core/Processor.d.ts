import { EngineSupport } from "../engine/EngineSupport";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { CONFIGTYPE } from "../middleware/constants/configType";
import {
  DeepIntersection,
  DeepPartial,
  DeepRecord,
  DeepUnion,
} from "../utils/utils";
import { Compiler } from "./Compiler";
import { ProxyNotice } from "./DataContainer";
export interface ProcessParams<C extends SymbolConfig, T extends object>
  extends ProxyNotice {
  config: C;
  target: T;
  processor: Processor<C, T>;
  compiler: Compiler<C, T>;
  engine: EngineSupport;
}
export declare type RegCommand<C extends SymbolConfig, T extends object> = {
  reg: RegExp;
  handler: (params: ProcessParams<C, T>) => void;
};
export declare type KeyCommand<C extends SymbolConfig, T extends object> = (
  params: ProcessParams<C, T>
) => void;
export declare type CommandStructure<
  C extends SymbolConfig,
  T extends object
> = DeepIntersection<
  DeepPartial<DeepRecord<DeepUnion<C, KeyCommand<C, T>>, KeyCommand<C, T>>>,
  {
    $reg?: RegCommand<C, T>[];
  }
>;
export interface ProcessorCommands<C extends SymbolConfig, T extends object> {
  add?: CommandStructure<C, T>;
  set?: CommandStructure<C, T>;
  delete?: CommandStructure<C, T>;
}
export interface ProcessorOptions<C extends SymbolConfig, T extends object> {
  configType: CONFIGTYPE | string;
  commands?: ProcessorCommands<C, T>;
  create: (config: C, engine: EngineSupport) => T;
  dispose: (target: T) => void;
}
export declare type DefineProcessor = <
  C extends SymbolConfig,
  T extends object
>(
  options: ProcessorOptions<C, T>
) => Processor<C, T>;
export declare class Processor<C extends SymbolConfig, T extends object> {
  configType: CONFIGTYPE | string;
  commands?: ProcessorCommands<C, T>;
  create: (config: C, engine: EngineSupport) => T;
  dispose: (target: T) => void;
  constructor(options: ProcessorOptions<C, T>);
  process(params: ProcessParams<C, T>): void;
  add(params: ProcessParams<C, T>): void;
  set(params: ProcessParams<C, T>): void;
  delete(params: ProcessParams<C, T>): void;
}
export declare const defineProcessor: DefineProcessor;
export declare const emptyHandler: () => void;
