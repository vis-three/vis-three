import { Strategy } from "@vis-three/core";
import { SelectionEngine } from "@vis-three/plugin-selection";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";
import { Color, Object3D, Texture } from "three";
interface SelectionPromptEngine extends SelectionEngine, EffectComposerEngine {
}
export interface SelectionPromptParameters {
    selected: Object3D[];
    visibleEdgeColor: Color;
    edgeGlow: number;
    edgeThickness: number;
    edgeStrength: number;
    downSampleRatio: number;
    pulsePeriod: number;
    patternTexture: Texture;
    msaa: number;
}
export declare const SELECTION_PROMPT_STRATEGY: string;
export declare const SelectionPromptStrategy: Strategy<SelectionPromptEngine, Partial<SelectionPromptParameters>>;
export {};
