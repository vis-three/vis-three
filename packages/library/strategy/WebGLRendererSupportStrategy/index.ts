import { Strategy } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  CONFIG_TYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  generateConfig,
  MODULE_TYPE,
} from "@vis-three/tdcm";
import { RendererCompiler } from "@vis-three/module-renderer/RendererCompiler";
import { transPkgName } from "@vis-three/utils";
import { WEBGL_RENDERER_PLUGIN } from "@vis-three/plugin-webgl-renderer";
import { name as pkgname } from "./package.json";
import WebGLRendererModel, {
  getWebGLRendererConfig,
  WebGLRendererSupportEngine,
} from "./WebGLRendererModel";

export * from "./WebGLRendererModel";

export const WEBGL_RENDERER_SUPPORT_STRATEGY = transPkgName(pkgname);

export const WebGLRendererSupportStrategy: Strategy<
  WebGLRendererSupportEngine,
  object
> = function () {
  return {
    name: WEBGL_RENDERER_SUPPORT_STRATEGY,
    condition: [
      COMPILER_MANAGER_PLUGIN,
      DATA_SUPPORT_MANAGER_PLUGIN,
      WEBGL_RENDERER_PLUGIN,
    ],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler<RendererCompiler>(
        MODULE_TYPE.RENDERER
      )!;

      compiler.useModel(WebGLRendererModel, (compiler) => {
        const originConfig = generateConfig(
          CONFIG_TYPE.WEBGLRENDERER,
          getWebGLRendererConfig()
        );

        engine.applyConfig(originConfig);
      });
    },
    rollback() {},
  };
};
