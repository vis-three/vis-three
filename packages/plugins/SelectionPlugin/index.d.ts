import { BaseEvent, Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
export interface SelectionEngine extends Engine {
    selectionBox: Set<Object3D>;
    setSelectionBox: (objects: Object3D[]) => SelectionEngine;
}
export interface SelectedEvent extends BaseEvent {
    objects: Object3D[];
}
export declare const SELECTED = "selected";
export declare const SELECTION_PLUGIN: string;
export declare const SelectionPlugin: Plugin<SelectionEngine, object>;
