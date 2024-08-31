import { BasicConfig } from "../common";
import { ModelOption } from "../model";
export declare const CONFIG_FACTORY: Record<string, () => BasicConfig>;
export declare const CONFIG_MODEL: Record<string, ModelOption<any, any, any, any, any>>;
export declare const MODULE_TYPE: Record<string, string>;
export declare const CONFIG_TYPE: Record<string, string>;
export declare const OBJECT_MODULE: Record<string, boolean>;
export declare const CONFIG_MODULE: Record<string, string>;
/**
 * @deprecated use CONFIG_FACTORY
 */
export declare const CONFIGFACTORY: Record<string, () => BasicConfig>;
/**
 * @deprecated use MODULE_TYPE
 */
export declare const MODULETYPE: Record<string, string>;
/**
 * @deprecated use CONFIG_TYPE
 */
export declare const CONFIGTYPE: Record<string, string>;
/**
 * @deprecated use OBJECT_MODULE
 */
export declare const OBJECTMODULE: Record<string, boolean>;
/**
 * @deprecated use CONFIG_MODULE
 */
export declare const CONFIGMODULE: Record<string, string>;
export declare const getModule: (type: string) => string | null;
export declare const isObjectModule: (module: string) => boolean;
export declare const isObjectType: (type: string) => boolean;
