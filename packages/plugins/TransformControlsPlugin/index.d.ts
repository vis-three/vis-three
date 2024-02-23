import { Engine, Plugin } from "@vis-three/core";
import { TransformControls } from "./TransformControls";
export * from "./TransformControls";
export interface TransformControlsEngine extends Engine {
    /**是否处于变换控制器的变换状态 */
    transing: boolean;
    /**变换控制器 */
    transformControls: TransformControls;
    /**设置变换控制器的显示隐藏 */
    setTransformControls: (show: boolean) => TransformControlsEngine;
}
export declare const TRANSFORM_CONTROLS_PLUGIN: string;
export declare const TransformControlsPlugin: Plugin<TransformControlsEngine, object>;
