export interface BasicConfig {
  vid: string;
  type: string;
  name: string;
  alias: string;
  meta: Record<string, any>;
}

/**
 * @deprecated
 * use BasicConfig
 */
export interface SymbolConfig extends BasicConfig {}

export interface Vector3Config {
  x: number;
  y: number;
  z: number;
}

export interface Vector2Config {
  x: number;
  y: number;
}

export const getBasicConfig = function (): BasicConfig {
  return {
    vid: "",
    type: "",
    name: "",
    alias: "",
    meta: {},
  };
};

/**
 * @deprecated
 * use getBasicConfig
 */
export const getSymbolConfig = getBasicConfig;

export const uniqueSymbol = function (type: string) {
  return `DEFUALT-${type}`;
};

export const emptyHandler = function () {};
