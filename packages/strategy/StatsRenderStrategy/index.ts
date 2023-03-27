import { StatsEngine, STATS_PLUGIN } from "@vis-three/plugin-stats";
import {
  RenderManagerEngine,
  RENDER_MANAGER_PLUGIN,
} from "@vis-three/plugin-render-manager";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { Strategy } from "@vis-three/core";

export interface StatsRenderEngine extends StatsEngine, RenderManagerEngine {}

export const STATS_RENDER_STRATEGY = transPkgName(pkgname);

export const StatsRenderStrategy: Strategy<StatsRenderEngine> = function () {
  let renderFun: () => void;
  let cacheSetStats: (show: boolean) => StatsEngine;
  return {
    name: STATS_RENDER_STRATEGY,
    condition: [RENDER_MANAGER_PLUGIN, STATS_PLUGIN],
    exec(engine) {
      renderFun = () => {
        engine.stats.update();
      };

      cacheSetStats = engine.setStats;

      engine.setStats = function (show: boolean) {
        cacheSetStats(show);
        if (show) {
          this.renderManager.addEventListener("render", renderFun);
        } else {
          this.renderManager.removeEventListener("render", renderFun);
        }
        return this;
      };
    },
    rollback(engine) {
      engine.setStats = cacheSetStats;
    },
  };
};
