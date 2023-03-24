import { ObjectConfig } from "@vis-three/module-object";
export interface GroupConfig extends ObjectConfig {
    children: string[];
}
export declare const getGroupConfig: () => GroupConfig;
