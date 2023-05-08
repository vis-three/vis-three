import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { FirstPersonControlsEngine } from "@vis-three/first-person-controls-plugin";
export interface FirstPersonRenderEngine extends FirstPersonControlsEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const FirstPersonRenderStrategy: Strategy<FirstPersonRenderEngine>;
