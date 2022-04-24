import { BasicEventConfig } from "../../middleware/object/ObjectCompiler";
export interface OpenWindow extends BasicEventConfig {
    params: {
        url: string;
    };
}
export declare const openWindow: (merge: OpenWindow) => OpenWindow;
