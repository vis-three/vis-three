import { Strategy } from "@vis-three/core";
import {
  Compiler,
  COMPILER_MANAGER_PLUGIN,
  CONFIGTYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  uniqueSymbol,
} from "@vis-three/middleware";
import { transPkgName } from "@vis-three/utils";
import { WEBGL_RENDERER_PLUGIN } from "@vis-three/webgl-renderer-plugin";
import { name as pkgname } from "./package.json";
import WebGLRendererProcessor, {
  WebGLRendererSupportEngine,
} from "./WebGLRendererProcessor";

export const WEBGL_RENDERER_SUPPORT_STRATEGY = transPkgName(pkgname);

export const WebGLRendererSupportStrategy: Strategy<WebGLRendererSupportEngine> =
  function () {
    return {
      name: WEBGL_RENDERER_SUPPORT_STRATEGY,
      condition: [
        COMPILER_MANAGER_PLUGIN,
        DATA_SUPPORT_MANAGER_PLUGIN,
        WEBGL_RENDERER_PLUGIN,
      ],
      exec(engine) {
        const compiler = engine.compilerManager.rendererCompiler;

        compiler.map.set(
          uniqueSymbol(CONFIGTYPE.WEBGLRENDERER),
          engine.webGLRenderer
        );

        compiler.weakMap.set(
          engine.webGLRenderer,
          uniqueSymbol(CONFIGTYPE.WEBGLRENDERER)
        );

        Compiler.processor(WebGLRendererProcessor);
      },
      rollback() {},
    };
  };
