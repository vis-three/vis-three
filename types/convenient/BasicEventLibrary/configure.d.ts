import { BasicEventConfig } from "../../middleware/event/EventCompiler";
export interface OpenWindow extends BasicEventConfig {
    params: {
        url: string;
    };
}
export declare const openWindow: (merge: OpenWindow) => OpenWindow;
