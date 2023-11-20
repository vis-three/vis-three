import {
  getSolidObjectConfig,
  SolidObjectConfig,
} from "@vis-three/module-solid-object";

/**
 * 直线物体配置
 */
export interface LineConfig extends SolidObjectConfig {
  /**材质vid标识 */
  material: string;
  /**几何vid标识 */
  geometry: string;
  /**是否为虚线，如果当前的使用材质是`LineDashedMaterial`请打开 */
  dashed: boolean;
}

export interface LineSegmentsConfig extends LineConfig {}

export interface LineFatConfig extends SolidObjectConfig {}

export interface LineSegmentsFatConfig extends SolidObjectConfig {}

export const getLineConfig = function (): LineConfig {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
    dashed: false,
  });
};

export const getLineSegmentsConfig = function (): LineSegmentsConfig {
  return getLineConfig();
};

export const getLineFatConfig = function (): LineFatConfig {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
  });
};

export const getLineSegmentsFatConfig = function (): LineSegmentsFatConfig {
  return Object.assign(getSolidObjectConfig(), {
    geometry: "",
    material: "",
  });
};
