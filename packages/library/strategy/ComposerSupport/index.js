import { MODULE_TYPE, PLUGINS } from "@vis-three/tdcm";
import PassModule from "@vis-three/module-pass";
import { EFFECT_COMPOSER_PLUGIN, } from "@vis-three/plugin-effect-composer";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
export const name = transPkgName(pkgname);
export const ComposerSupportStrategy = function () {
    return {
        name,
        condition: [...PLUGINS, EFFECT_COMPOSER_PLUGIN],
        exec(engine) {
            const compiler = engine.compilerManager.getCompiler(MODULE_TYPE.PASS);
            if (!compiler) {
                engine.useModule(PassModule);
            }
            compiler.useEngine(engine);
        },
        rollback(engine) { },
    };
};
