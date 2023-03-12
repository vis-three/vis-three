import { SymbolConfig } from "../common";
import { Compiler } from "../compiler";
import { DataSupportSimplifier } from "../dataSupport";
import { Processor } from "../Processor";

export const CONFIGFACTORY: Record<string, () => SymbolConfig> = {};

export const MODULETYPE: Record<string, string> = {};

export const CONFIGTYPE: Record<string, string> = {};

export const OBJECTMODULE: Record<string, boolean> = {};

export const CompilerMembers: Record<string, typeof Compiler<any, any>> = {};

export const DataSupportMembers: Record<
  string,
  DataSupportSimplifier<any, any, any>
> = {};

export const ProcessorMembers: Record<
  string,
  Processor<any, any, any, any>
> = {};

export const getModule = (type: string): string | null => {
  const matchModule = (module: string) => {
    return type.toLocaleLowerCase().includes(module.toLocaleLowerCase());
  };

  for (const module of Object.values(MODULETYPE)) {
    if (matchModule(module)) {
      return module;
    }
  }

  return null;
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

export const DataSupportSelector = function (type: string) {
  return DataSupportMembers[type];
};

export const CompilerSelector = function (type: string) {
  return CompilerMembers[type];
};

export const ProcessorSelector = function (type: string) {
  return ProcessorMembers[type];
};

export const installProcessor = function (
  processor: Processor<any, any, any, any>
) {
  ProcessorMembers[processor.type] = processor;
  CONFIGTYPE[processor.type.toLocaleUpperCase()] = processor.type;
  CONFIGFACTORY[processor.type] = processor.config;
};
