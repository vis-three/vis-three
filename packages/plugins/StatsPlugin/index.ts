import { Engine, Plugin } from "@vis-three/core";
import { VisStats, VisStatsParameters } from "./VisStats";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export interface StatsEngine extends Engine {
  stats: VisStats;
  setStats: (show: boolean) => StatsEngine;
}

export const STATS_PLUGIN = transPkgName(pkgname);

export const StatsPlugin: Plugin<StatsEngine> = function (
  params?: VisStatsParameters
) {
  return {
    name: STATS_PLUGIN,
    install(engine) {
      const stats = new VisStats(params);

      engine.stats = stats;

      engine.setStats = function (show: boolean) {
        if (show) {
          engine.dom.appendChild(stats.domElement);
        } else {
          try {
            this.dom.removeChild(stats.domElement);
          } catch (error) {}
        }
        return this;
      };
    },
    dispose(engine: Optional<StatsEngine, "stats" | "setStats">) {
      delete engine.stats;
      delete engine.setStats;
    },
  };
};
