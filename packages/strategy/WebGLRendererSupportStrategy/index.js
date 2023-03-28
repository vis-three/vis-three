import { COMPILER_MANAGER_PLUGIN, CONFIGTYPE, DATA_SUPPORT_MANAGER_PLUGIN, MODULETYPE, uniqueSymbol, } from "@vis-three/middleware";
import { transPkgName } from "@vis-three/utils";
import { WEBGL_RENDERER_PLUGIN } from "@vis-three/plugin-webgl-renderer";
import { name as pkgname } from "./package.json";
import WebGLRendererProcessor from "./WebGLRendererProcessor";
export const WEBGL_RENDERER_SUPPORT_STRATEGY = transPkgName(pkgname);
export const WebGLRendererSupportStrategy = function () {
    return {
        name: WEBGL_RENDERER_SUPPORT_STRATEGY,
        condition: [
            COMPILER_MANAGER_PLUGIN,
            DATA_SUPPORT_MANAGER_PLUGIN,
            WEBGL_RENDERER_PLUGIN,
        ],
        exec(engine) {
            const compiler = engine.compilerManager.getCompiler(MODULETYPE.RENDERER);
            compiler.reigstProcessor(WebGLRendererProcessor, (compiler) => {
                compiler.map.set(uniqueSymbol(CONFIGTYPE.WEBGLRENDERER), engine.webGLRenderer);
                compiler.weakMap.set(engine.webGLRenderer, uniqueSymbol(CONFIGTYPE.WEBGLRENDERER));
            });
        },
        rollback() { },
    };
};
