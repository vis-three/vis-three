import { GridHelperEngine } from "@vis-three/plugin-grid-helper";
import { ViewpointEngine } from "@vis-three/plugin-viewpoint";
import { Strategy } from "@vis-three/core";
export interface GridViewpointEngine extends GridHelperEngine, ViewpointEngine {
}
export declare const GRID_VIEWPOINT_STRATEGY: string;
export declare const GridViewpointStrategy: Strategy<GridViewpointEngine>;
