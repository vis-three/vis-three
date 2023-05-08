import { COMPILER_MANAGER_PLUGIN, CONFIGTYPE, DATA_SUPPORT_MANAGER_PLUGIN, MODULETYPE, uniqueSymbol, } from "@vis-three/middleware";
import { CSS3D_RENDERER_PLUGIN } from "@vis-three/plugin-css3d-renderer";
import { transPkgName } from "@vis-three/utils";
import CSS3DRendererProcessor from "./CSS3DRendererProcessor";
import { name as pkgname } from "./package.json";
export const CSS3D_RENDERER_SUPPORT_STRATEGY = transPkgName(pkgname);
export const CSS3DRendererSupportStrategy = function () {
    return {
        name: CSS3D_RENDERER_SUPPORT_STRATEGY,
        condition: [
            COMPILER_MANAGER_PLUGIN,
            DATA_SUPPORT_MANAGER_PLUGIN,
            CSS3D_RENDERER_PLUGIN,
        ],
        exec(engine) {
            const compiler = engine.compilerManager.getCompiler(MODULETYPE.RENDERER);
            compiler.reigstProcessor(CSS3DRendererProcessor, (compiler) => {
                compiler.map.set(uniqueSymbol(CONFIGTYPE.CSS3DRENDERER), engine.css3DRenderer);
                compiler.weakMap.set(engine.css3DRenderer, uniqueSymbol(CONFIGTYPE.CSS3DRENDERER));
            });
        },
        rollback() { },
    };
};
