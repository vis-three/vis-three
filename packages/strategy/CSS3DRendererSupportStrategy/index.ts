import { Strategy } from "@vis-three/core";
import { CSS3D_RENDERER_PLUGIN } from "@vis-three/css3d-renderer-plugin";
import {
  Compiler,
  COMPILER_MANAGER_PLUGIN,
  CONFIGTYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  MODULETYPE,
  RendererCompiler,
  uniqueSymbol,
} from "@vis-three/middleware";
import { transPkgName } from "@vis-three/utils";
import CSS3DRendererProcessor, {
  CSS3DRendererSupportEngine,
} from "./CSS3DRendererProcessor";
import { name as pkgname } from "./package.json";

export const CSS3D_RENDERER_SUPPORT_STRATEGY = transPkgName(pkgname);

export const CSS3DRendererSupportStrategy: Strategy<CSS3DRendererSupportEngine> =
  function () {
    return {
      name: CSS3D_RENDERER_SUPPORT_STRATEGY,
      condition: [
        COMPILER_MANAGER_PLUGIN,
        DATA_SUPPORT_MANAGER_PLUGIN,
        CSS3D_RENDERER_PLUGIN,
      ],
      exec(engine) {
        const compiler = engine.compilerManager.getCompiler<RendererCompiler>(
          MODULETYPE.RENDERER
        )!;

        compiler.map.set(
          uniqueSymbol(CONFIGTYPE.CSS3DRENDERER),
          engine.css3DRenderer
        );

        compiler.weakMap.set(
          engine.css3DRenderer,
          uniqueSymbol(CONFIGTYPE.CSS3DRENDERER)
        );

        Compiler.processor(CSS3DRendererProcessor);
      },
      rollback() {},
    };
  };
