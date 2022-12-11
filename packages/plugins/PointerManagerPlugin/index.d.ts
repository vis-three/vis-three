import { Engine } from "../../engine/Engine";
import { Plugin } from "../plugin";
import { PointerManager } from "./PointerManager";
export interface PointerManagerEngine extends Engine {
    pointerManager: PointerManager;
}
declare const PointerManagerPlugin: Plugin<PointerManagerEngine>;
export default PointerManagerPlugin;
