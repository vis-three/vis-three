import { Engine, Plugin } from "@vis-three/core";
import { GridHelper } from "three";
export interface GridHelperParameters {
    range?: number;
    spacing?: number;
    axesColor?: string;
    cellColor?: string;
    opacity?: number;
}
export interface GridHelperEngine extends Engine {
    gridHelper: GridHelper;
    setGridHelper: (show: boolean) => GridHelperEngine;
}
export declare const GRID_HELPER_PLUGIN: string;
export declare const GridHelperPlugin: Plugin<GridHelperEngine>;
