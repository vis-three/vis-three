import { Engine } from "../../engine";
import { RenderManager } from "./RenderManager";
export interface RenderManagerEngine extends Engine {
    renderManager: RenderManager;
}
declare const _default: import("../plugin").Plugin<RenderManagerEngine>;
export default _default;
