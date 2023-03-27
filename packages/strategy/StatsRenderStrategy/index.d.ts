import { StatsEngine } from "@vis-three/plugin-stats";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { Strategy } from "@vis-three/core";
export interface StatsRenderEngine extends StatsEngine, RenderManagerEngine {
}
export declare const STATS_RENDER_STRATEGY: string;
export declare const StatsRenderStrategy: Strategy<StatsRenderEngine>;
