import { Strategy } from "@vis-three/core";
import {
  COMPILER_MANAGER_PLUGIN,
  CONFIG_TYPE,
  DATA_SUPPORT_MANAGER_PLUGIN,
  generateConfig,
  MODULE_TYPE
} from "@vis-three/tdcm";
import { RendererCompiler } from "@vis-three/module-renderer";
import { CSS3D_RENDERER_PLUGIN } from "@vis-three/plugin-css3d-renderer";
import { transPkgName } from "@vis-three/utils";
import {
  CSS3DRendererSupportEngine,
  getCSS3DRenderereConfig,
} from "./CSS3DRendererModel";
import { name as pkgname } from "./package.json";
import CSS3DRendererModel from "./CSS3DRendererModel";

export const CSS3D_RENDERER_SUPPORT_STRATEGY = transPkgName(pkgname);

export const CSS3DRendererSupportStrategy: Strategy<
  CSS3DRendererSupportEngine,
  object
> = function () {
  return {
    name: CSS3D_RENDERER_SUPPORT_STRATEGY,
    condition: [
      COMPILER_MANAGER_PLUGIN,
      DATA_SUPPORT_MANAGER_PLUGIN,
      CSS3D_RENDERER_PLUGIN,
    ],
    exec(engine) {
      const compiler = engine.compilerManager.getCompiler<RendererCompiler>(
        MODULE_TYPE.RENDERER
      )!;

      compiler.useModel(CSS3DRendererModel, (compiler) => {
        const originConfig = generateConfig(
          CONFIG_TYPE.CSS3DRENDERER,
          getCSS3DRenderereConfig()
        );

        engine.applyConfig(originConfig);
      });
    },
    rollback() {},
  };
};
