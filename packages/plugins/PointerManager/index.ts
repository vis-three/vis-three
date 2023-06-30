import { Engine, ENGINE_EVENT, Plugin, SetDomEvent } from "@vis-three/core";
import { PointerManager, PointerManagerParameters } from "./PointerManager";
import { name as pkgname } from "./package.json";
import { Optional, transPkgName } from "@vis-three/utils";

export * from "./PointerManager";

export interface PointerManagerEngine extends Engine {
  /**指针管理器 */
  pointerManager: PointerManager;
}

export const POINTER_MANAGER_PLUGIN = transPkgName(pkgname);

export const PointerManagerPlugin: Plugin<
  PointerManagerEngine,
  PointerManagerParameters
> = function (params?: PointerManagerParameters) {
  let setDomFun: ((event: SetDomEvent) => void) | undefined;

  return {
    name: POINTER_MANAGER_PLUGIN,
    install(engine) {
      const pointerManager = new PointerManager(
        Object.assign(params || {}, {
          dom: engine.dom,
        })
      );

      setDomFun = (event) => {
        pointerManager.setDom(event.dom);
      };

      engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

      engine.pointerManager = pointerManager;
    },

    dispose(engine) {
      engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun!);
      setDomFun = undefined;
    },
  };
};
