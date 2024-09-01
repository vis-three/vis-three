import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { FirstPersonControlsEngine } from "@vis-three/plugin-first-person-controls";
export interface FirstPersonRenderEngine extends FirstPersonControlsEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const FirstPersonRenderStrategy: Strategy<FirstPersonRenderEngine>;
