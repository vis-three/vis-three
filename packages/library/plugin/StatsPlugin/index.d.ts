import { Engine, Plugin } from "@vis-three/core";
import { VisStats, VisStatsParameters } from "./VisStats";
export interface StatsEngine extends Engine {
    /**监视器 */
    stats: VisStats;
    /**设置监视器显示隐藏 */
    setStats: (show: boolean) => StatsEngine;
}
export declare const STATS_PLUGIN: string;
export declare const StatsPlugin: Plugin<StatsEngine, VisStatsParameters>;
