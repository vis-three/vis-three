import { Engine, Plugin } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export const TEMPLATE_PLUGIN = transPkgName(pkgname);

export const TemplatePlugin: Plugin<Engine> = function () {
  return {
    name: TEMPLATE_PLUGIN,
    install(engine) {},
    dispose(engine) {},
  };
};
