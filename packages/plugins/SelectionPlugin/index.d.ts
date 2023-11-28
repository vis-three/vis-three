import { BaseEvent, Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
export interface SelectionEngine extends Engine {
    /**当前engine的选中对象集合 */
    selectionBox: Set<Object3D>;
    /**设置当前engine的选中物体 */
    setSelectionBox: (objects: Object3D[]) => SelectionEngine;
    selectionDisable: boolean;
}
export interface SelectedEvent extends BaseEvent {
    objects: Object3D[];
}
export declare const SELECTED = "selected";
export declare const SELECTION_PLUGIN: string;
export declare const SelectionPlugin: Plugin<SelectionEngine, object>;
