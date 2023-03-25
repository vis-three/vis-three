import { SymbolConfig, Vector2Config } from "@vis-three/middleware";
export interface RendererConfig extends SymbolConfig {
    size: Vector2Config | null;
}
export interface CSS3DRendererConfig extends RendererConfig {
}
export declare const getRendererConfig: () => RendererConfig;
