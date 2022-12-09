import { Engine, ENGINE_EVENT, SetDomEvent } from "../../engine/Engine";
import { Plugin } from "../plugin";
import { PointerManager, PointerManagerParameters } from "./PointerManager";

export interface PointerManagerEngine extends Engine {
  pointerManager: PointerManager;
}

const PointerManagerPlugin: Plugin<PointerManagerEngine> = function (
  params: PointerManagerParameters
) {
  let setDomFun: ((event: SetDomEvent) => void) | undefined;

  return {
    name: "PointerManagerPlugin",
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

export default PointerManagerPlugin;
