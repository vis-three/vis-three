import { Plugin } from "@vis-three/core";
import { EngineSupport } from "@vis-three/tdcm";
import { SelectedEvent, SelectionEngine } from "@vis-three/plugin-selection";
export interface SelectionSupportEngine extends SelectionEngine, EngineSupport {
    /**通过vid标识设置场景的选中对象 */
    setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
}
export interface SelectedSupportEvent extends SelectedEvent {
    objectSymbols: string[];
}
export declare const SELECTION_SUPPORT_PLUGIN: string;
export declare const SelectionSupportPlugin: Plugin<SelectionSupportEngine, object>;
