import { AniScriptGenerator, BasicAniScriptConfig } from "./AniScriptLibrary";
export interface LinearTime extends BasicAniScriptConfig {
    multiply: number;
}
export declare const config: LinearTime;
export declare const generator: AniScriptGenerator<LinearTime>;
