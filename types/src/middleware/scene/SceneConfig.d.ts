import { ObjectConfig } from "../object/ObjectConfig";
export interface SceneFogConfig {
    type: string;
    color: string;
    near: number;
    far: number;
    density: number;
}
export interface SceneConfig extends ObjectConfig {
    background: string | null;
    environment: string | null;
    fog: SceneFogConfig;
}
export declare const getSceneConfig: () => SceneConfig;
