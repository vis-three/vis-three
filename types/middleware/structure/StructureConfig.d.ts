import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
export interface StructureConfig extends SymbolConfig {
    type: CONFIGTYPE.STRUCTURE;
    vid: string;
    structure: {
        [key: SymbolConfig["vid"]]: [SymbolConfig["vid"]];
    };
}
export declare const getStructureConfig: () => StructureConfig;
