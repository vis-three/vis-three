import { Object3D } from "three";
import { BaseEvent } from "../core/EventDispatcher";
import { Plugin } from "./plugin";
export interface SelectionParameters {
}
export interface SelectedEvent extends BaseEvent {
    objects: Object3D[];
    objectSymbols: string[];
}
export declare const SelectionPlugin: Plugin<SelectionParameters>;
