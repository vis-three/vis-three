import { Engine, Plugin } from "@vis-three/core";
import { VisStats } from "./VisStats";
export interface StatsEngine extends Engine {
    stats: VisStats;
    setStats: (show: boolean) => StatsEngine;
}
export declare const STATS_PLUGIN: string;
export declare const StatsPlugin: Plugin<StatsEngine>;
