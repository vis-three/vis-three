import { EngineSupport, ProcessorCommands, ProcessParams } from "@vis-three/middleware";
import { IgnoreAttribute } from "@vis-three/utils";
import { Light } from "three";
import { LightCompiler } from "../LightCompiler";
import { LightConifg, ShadowLightConfig } from "../LightConfig";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";
export interface WebGLRendererEngineSupport extends EngineSupport, WebGLRendererEngine {
}
export declare const colorHandler: <C extends LightConifg, O extends Light>({ target, value, }: ProcessParams<C, O, EngineSupport, LightCompiler>) => void;
export declare const lightCreate: <C extends LightConifg, O extends Light>(light: O, config: C, filter: IgnoreAttribute<C>, engine: EngineSupport) => O;
export declare const shadowLightCreate: <P, C extends ShadowLightConfig<P>, O extends Light>(light: O, config: C, filter: IgnoreAttribute<C>, engine: WebGLRendererEngineSupport) => O;
export type LightCommands<C extends LightConifg, O extends Light> = ProcessorCommands<C, O, WebGLRendererEngineSupport, LightCompiler>;
export declare const lightCommands: LightCommands<LightConifg, Light>;
export declare const ShadowCommands: {
    set: {
        shadow: {
            mapSize({ target, config, engine, key, value, }: ProcessParams<ShadowLightConfig, Light, WebGLRendererEngineSupport, LightCompiler>): void;
            camera({ target, key, value, }: ProcessParams<ShadowLightConfig, Light, EngineSupport, LightCompiler>): void;
        };
    };
};
