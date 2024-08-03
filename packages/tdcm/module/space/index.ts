import { BasicConfig } from "../common";
import { Model } from "../model";

export const CONFIG_FACTORY: Record<string, () => BasicConfig> = {};

export const CONFIG_MODEL: Record<string, typeof Model> = {};

export const MODULE_TYPE: Record<string, string> = {};

export const CONFIG_TYPE: Record<string, string> = {};

export const OBJECT_MODULE: Record<string, boolean> = {};

export const CONFIG_MODULE: Record<string, string> = {};

/**
 * @deprecated use CONFIG_FACTORY
 */
export const CONFIGFACTORY = CONFIG_FACTORY;

/**
 * @deprecated use MODULE_TYPE
 */
export const MODULETYPE = MODULE_TYPE;

/**
 * @deprecated use CONFIG_TYPE
 */
export const CONFIGTYPE = CONFIG_TYPE;

/**
 * @deprecated use OBJECT_MODULE
 */
export const OBJECTMODULE = OBJECT_MODULE;

/**
 * @deprecated use CONFIG_MODULE
 */
export const CONFIGMODULE = CONFIG_MODULE;

export const getModule = (type: string): string | null => {
  return CONFIG_MODULE[type] || null;
};

export const isObjectModule = (module: string): boolean => {
  return OBJECT_MODULE[module];
};

export const isObjectType = (type: string): boolean => {
  const module = getModule(type);
  if (module) {
    return isObjectModule(module);
  } else {
    return false;
  }
};
