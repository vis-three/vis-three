import { Engine, Plugin } from "@vis-three/core";
import { AxesHelper } from "three";
export interface AxesHelperParameters {
    /**坐标轴长度 */
    length?: number;
}
export interface AxesHelperOptions {
}
export interface AxesHelperEngine extends Engine {
    /**坐标轴物体 */
    axesHelper: AxesHelper;
    /** 设置显示隐藏坐标轴方法。*/
    setAxesHelper: (show: boolean, params: AxesHelperOptions) => AxesHelperEngine;
}
export declare const AXES_HELPER_PLUGIN: string;
export declare const AxesHelperPlugin: Plugin<AxesHelperEngine, AxesHelperParameters>;
