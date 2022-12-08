import { Engine } from "./Engine";
export interface PluginOptions {
    name: string;
    deps: string | string[];
    repeat: boolean;
    beforeInstall: (name: string, engine: Engine) => void;
    install: (engine: Engine) => void;
    installed: (name: string, engine: Engine) => void;
    dispose: (engine: Engine) => void;
}
export type Plugin = (params: any) => PluginOptions;
export declare const definePlugin: (options: PluginOptions) => Plugin;
