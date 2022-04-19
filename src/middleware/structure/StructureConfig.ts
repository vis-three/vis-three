import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";

export interface StructureConfig extends SymbolConfig {
  type: CONFIGTYPE.STRUCTURE;
  vid: string; // scene vid
  structure: {
    [key: SymbolConfig["vid"]]: [SymbolConfig["vid"]];
  };
}

export const getStructureConfig = function (): StructureConfig {
  return {
    vid: "",
    type: CONFIGTYPE.STRUCTURE,
    structure: {},
  };
};
