import { ObjectConfig } from "../object/ObjectConfig";
export interface GroupConfig extends ObjectConfig {
    children: string[];
}
export declare const getGroupConfig: () => GroupConfig;
