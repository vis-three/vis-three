import { GridHelperEngine } from "@vis-three/grid-helper-plugin";
import { ViewpointEngine } from "@vis-three/viewpoint-plugin";
import { Strategy } from "@vis-three/core";
export interface GridViewpointEngine extends GridHelperEngine, ViewpointEngine {
}
export declare const GRID_VIEWPOINT_STRATEGY: string;
export declare const GridViewpointStrategy: Strategy<GridViewpointEngine>;
