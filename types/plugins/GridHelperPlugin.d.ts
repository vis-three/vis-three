import { Plugin } from "./plugin";
export interface GridHelperParameters {
    range?: number;
    spacing?: number;
    axesColor?: string;
    cellColor?: string;
    opacity?: number;
}
export declare const GridHelperPlugin: Plugin<GridHelperParameters>;
