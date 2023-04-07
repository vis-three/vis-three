import { Engine, Strategy } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";

import { name as pkgname } from "./package.json";

export const TEMPLATE_STRATEGY = transPkgName(pkgname);

export const TemplateStrategy: Strategy<Engine> = function () {
  return {
    name: TEMPLATE_STRATEGY,
    condition: [],
    exec(engine) {},
    rollback(engine) {},
  };
};
