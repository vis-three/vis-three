import { ObjectConfig } from "@vis-three/module-object";
export interface BoneConfig extends ObjectConfig {
    children: string[];
}
export declare const getBoneConfig: () => BoneConfig;
