export interface SymbolConfig {
  vid: string;
  type: string;
  name: string;
  alias: string;
}

export interface Vector3Config {
  x: number;
  y: number;
  z: number;
}

export interface Vector2Config {
  x: number;
  y: number;
}

export const getSymbolConfig = function (): SymbolConfig {
  return {
    vid: "",
    type: "",
    name: "",
    alias: "",
  };
};

export const uniqueSymbol = function (type: string) {
  return `DEFUALT-${type}`;
};

export const emptyHandler = function () {};
