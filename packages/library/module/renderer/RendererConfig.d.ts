import { BasicConfig, Vector2Config } from "@vis-three/tdcm";
export interface RendererConfig extends BasicConfig {
    size: Vector2Config | null;
}
export interface CSS3DRendererConfig extends RendererConfig {
}
export declare const getRendererConfig: () => RendererConfig;
