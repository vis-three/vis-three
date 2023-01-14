import { Engine, Plugin } from "@vis-three/core";
import { AxesHelper } from "three";
export interface AxesHelperParameters {
    length?: number;
}
export interface AxesHelperOptions {
}
export interface AxesHelperEngine extends Engine {
    axesHelper: AxesHelper;
    setAxesHelper: (show: boolean, params: AxesHelperOptions) => AxesHelperEngine;
}
export declare const AXES_HELPER_PLUGIN: string;
export declare const AxesHelperPlugin: Plugin<AxesHelperEngine>;
