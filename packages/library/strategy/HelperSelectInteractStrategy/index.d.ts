import { Strategy } from "@vis-three/core";
import { EventManagerEngine } from "@vis-three/plugin-event-manager";
import { ObjectHelperEngine } from "@vis-three/plugin-object-helper";
import { SelectionEngine } from "@vis-three/plugin-selection";
import { TransformControlsEngine } from "@vis-three/plugin-transform-controls";
export interface HelperSelectInteractEngine extends EventManagerEngine, ObjectHelperEngine, SelectionEngine, TransformControlsEngine {
}
export declare const HELPER_SELECT_INTERACT_STRATEGY: string;
export interface HelperSelectInteractParameters {
    /**是否会与辅助进行交互 */
    interact?: boolean;
    /**选中激活时的颜色 */
    activeColor?: string;
    /**鼠标hover时候的颜色 */
    hoverColor?: string;
    /**默认的辅助颜色 */
    defaultColor?: string;
    /**选中时候的辅助颜色 */
    selectedColor?: string;
}
export declare const HelperSelectInteractStrategy: Strategy<HelperSelectInteractEngine>;
