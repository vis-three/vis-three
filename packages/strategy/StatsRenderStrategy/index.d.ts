import { StatsEngine } from "@vis-three/stats-plugin";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { Strategy } from "@vis-three/core";
export interface StatsRenderEngine extends StatsEngine, RenderManagerEngine {
}
export declare const STATS_RENDER_STRATEGY: string;
export declare const StatsRenderStrategy: Strategy<StatsRenderEngine>;
