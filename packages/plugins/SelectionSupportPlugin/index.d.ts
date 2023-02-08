import { Plugin } from "@vis-three/core";
import { EngineSupport } from "@vis-three/middleware";
import { SelectionEngine } from "@vis-three/selection-plugin";
export interface SelectionSupportEngine extends SelectionEngine, EngineSupport {
    setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
}
export declare const SELECTED = "selected";
export declare const SELECTION_SUPPORT_PLUGIN: string;
export declare const SelectionSupportPlugin: Plugin<SelectionSupportEngine>;
