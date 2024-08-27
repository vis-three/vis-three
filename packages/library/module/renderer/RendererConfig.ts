import { BasicConfig, Vector2Config, getBasicConfig } from "@vis-three/tdcm";

export interface RendererConfig extends BasicConfig {
  size: Vector2Config | null; // 为null 默认跟随canves
}

export interface CSS3DRendererConfig extends RendererConfig {}

export const getRendererConfig = function (): RendererConfig {
  return Object.assign(getBasicConfig(), { size: null });
};
