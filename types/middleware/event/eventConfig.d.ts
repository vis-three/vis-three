import { SymbolConfig } from "../common/CommonConfig";
import { BasicEventConfig } from "./EventCompiler";
export interface EventConfig extends SymbolConfig {
    target: string;
    pointerdown: BasicEventConfig[];
    pointermove: BasicEventConfig[];
    pointerup: BasicEventConfig[];
    pointerenter: BasicEventConfig[];
    pointerleave: BasicEventConfig[];
    click: BasicEventConfig[];
    dblclick: BasicEventConfig[];
    contextmenu: BasicEventConfig[];
}
export declare const getEventConfig: () => EventConfig;
