import { SymbolConfig } from "../common/CommonConfig";
export interface SceneFogConfig {
    type: 'Fog' | 'FogExp2' | '';
    color: string;
    near: number;
    far: number;
    density: number;
}
export interface SceneConfig extends SymbolConfig {
    background: string | null;
    environment: string | null;
    fog: SceneFogConfig;
}
export declare const getSceneConfig: () => SceneConfig;
