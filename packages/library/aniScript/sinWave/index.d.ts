import { AniScriptGenerator, BasicAniScriptConfig } from "@vis-three/middleware";
export interface SinWave extends BasicAniScriptConfig {
    wavelength: number;
    offset: number;
    amplitude: number;
    speed: number;
}
export declare const config: SinWave;
export declare const generator: AniScriptGenerator<SinWave>;
