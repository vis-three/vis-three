import { BasicEventConfig, EventGenerator } from "../EventLibrary";
export interface OpenWindow extends BasicEventConfig {
    params: {
        url: string;
    };
}
export declare const config: OpenWindow;
export declare const generator: EventGenerator<OpenWindow>;
