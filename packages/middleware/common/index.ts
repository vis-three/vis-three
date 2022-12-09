import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import { MODULETYPE, OBJECTMODULE } from "../constants/MODULETYPE";

export interface SymbolConfig {
  vid: string;
  type: string;
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

export const uniqueSymbol = function (type: CONFIGTYPE) {
  return `DEFUALT-${type}`;
};

export const getModule = (type: CONFIGTYPE | string): MODULETYPE | null => {
  const matchModule = (module: MODULETYPE) => {
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
