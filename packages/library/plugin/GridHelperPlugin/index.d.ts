import { Engine, Plugin } from "@vis-three/core";
import { GridHelper } from "three";
export interface GridHelperParameters {
    /**网格范围 */
    range?: number;
    /**网格大小 */
    spacing?: number;
    /**网格中轴颜色 */
    axesColor?: string;
    /**网格颜色 */
    cellColor?: string;
    /**网格透明度 */
    opacity?: number;
}
export interface GridHelperEngine extends Engine {
    /**网格物体对象 */
    gridHelper: GridHelper;
    /**设置网格物体 */
    setGridHelper: (show: boolean) => GridHelperEngine;
}
export declare const GRID_HELPER_PLUGIN: string;
export declare const GridHelperPlugin: Plugin<GridHelperEngine, GridHelperParameters>;
