import { Compiler, COMPILER_MANAGER_PLUGIN, CONFIGTYPE, DATA_SUPPORT_MANAGER_PLUGIN, MODULETYPE, uniqueSymbol, } from "@vis-three/middleware";
import { TRANSFORM_CONTROLS_PLUGIN, TRANSFORM_EVENT, } from "@vis-three/transform-controls-plugin";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import TransformControlsProcessor from "./TransformControlsProcessor";
export const TRANSFORM_CONTROLS_SUPPORT_STRATEGY = transPkgName(pkgname);
export const TransformControlsSupportStrategy = function () {
    return {
        name: TRANSFORM_CONTROLS_SUPPORT_STRATEGY,
        condition: [
            COMPILER_MANAGER_PLUGIN,
            DATA_SUPPORT_MANAGER_PLUGIN,
            TRANSFORM_CONTROLS_PLUGIN,
        ],
        exec(engine) {
            const compiler = engine.compilerManager.getCompiler(MODULETYPE.CONTROLS);
            compiler.map.set(uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS), engine.transformControls);
            compiler.weakMap.set(engine.transformControls, uniqueSymbol(CONFIGTYPE.ORBITCONTROLS));
            Compiler.processor(TransformControlsProcessor);
            const objectToConfig = (object) => {
                const symbol = engine.compilerManager.getObjectSymbol(object);
                if (!symbol) {
                    return null;
                }
                return engine.dataSupportManager.getConfigBySymbol(symbol);
            };
            let config = null;
            let mode;
            engine.transformControls.addEventListener(TRANSFORM_EVENT.CHANGED, (event) => {
                const e = event;
                e.transObjectSet.forEach((object) => {
                    config = objectToConfig(object);
                    mode = e.mode;
                    if (config) {
                        config[mode].x = object[mode].x;
                        config[mode].y = object[mode].y;
                        config[mode].z = object[mode].z;
                    }
                });
            });
        },
        rollback() { },
    };
};
