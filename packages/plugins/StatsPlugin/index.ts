import { Engine, ENGINE_EVENT, Plugin, RenderEvent } from "@vis-three/core";
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
  let renderFun: (event: RenderEvent) => void;

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

      renderFun = (event) => {
        stats.update();
      };

      engine.addEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
    },
    dispose(engine: Optional<StatsEngine, "stats" | "setStats">) {
      engine.removeEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      delete engine.stats;
      delete engine.setStats;
    },
  };
};
