import { Plugin } from "./plugin";
export interface ObjectHelperParameters {
    interact?: boolean;
    activeColor?: string;
    hoverColor?: string;
    defaultColor?: string;
    selectedColor?: string;
}
export declare const ObjectHelperPlugin: Plugin<ObjectHelperParameters>;
