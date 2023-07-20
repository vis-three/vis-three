import { SymbolConfig } from "../common";
import { Processor } from "../processor";

export const CONFIGFACTORY: Record<string, () => SymbolConfig> = {};

export const MODULETYPE: Record<string, string> = {};

export const CONFIGTYPE: Record<string, string> = {};

export const OBJECTMODULE: Record<string, boolean> = {};

export const CONFIGMODULE: Record<string, string> = {};

export const ProcessorMembers: Record<
  string,
  Processor<any, any, any, any>
> = {};

export const getModule = (type: string): string | null => {
  return CONFIGMODULE[type] || null;
};

export const isObjectModule = (module: string): boolean => {
  return OBJECTMODULE[module];
};

export const isObjectType = (type: string): boolean => {
  const module = getModule(type);
  if (module) {
    return isObjectModule(module);
  } else {
    return false;
  }
};

export const installProcessor = function (
  processor: Processor<any, any, any, any>,
  module: string
) {
  ProcessorMembers[processor.type] = processor;
  CONFIGTYPE[processor.type.toLocaleUpperCase()] = processor.type;
  CONFIGFACTORY[processor.type] = processor.config;
  CONFIGMODULE[processor.type] = module;
};
