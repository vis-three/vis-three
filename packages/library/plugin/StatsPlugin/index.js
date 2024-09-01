import { ENGINE_EVENT } from "@vis-three/core";
import { VisStats } from "./VisStats";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const STATS_PLUGIN = transPkgName(pkgname);
export const StatsPlugin = function (params) {
    let renderFun;
    return {
        name: STATS_PLUGIN,
        install(engine) {
            const stats = new VisStats(params);
            engine.stats = stats;
            engine.setStats = function (show) {
                if (show) {
                    engine.dom.appendChild(stats.domElement);
                }
                else {
                    try {
                        engine.dom.removeChild(stats.domElement);
                    }
                    catch (error) { }
                }
                return this;
            };
            renderFun = (event) => {
                stats.update();
            };
            engine.addEventListener(ENGINE_EVENT.RENDER, renderFun);
        },
        dispose(engine) {
            engine.removeEventListener(ENGINE_EVENT.RENDER, renderFun);
            delete engine.stats;
            delete engine.setStats;
        },
    };
};
