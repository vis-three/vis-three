import { EngineSupport } from "../../engine/EngineSupport";
import { RenderEvent } from "../../manager/RenderManager";
export interface BasicAniScriptConfig {
    name: string;
}
export declare type AniScriptGenerator<C extends BasicAniScriptConfig> = (engine: EngineSupport, target: object, attribute: string, config: C) => (event: RenderEvent) => void;
export declare class AniScriptLibrary {
    private static configLibrary;
    private static generatorLibrary;
    static register: <C extends BasicAniScriptConfig>(config: C, generator: AniScriptGenerator<C>) => void;
    static generateConfig(name: string, merge: object): BasicAniScriptConfig;
    static generateScript(engine: EngineSupport, target: object, attribute: string, config: BasicAniScriptConfig): (event: RenderEvent) => void;
    static has(name: string): boolean;
}
