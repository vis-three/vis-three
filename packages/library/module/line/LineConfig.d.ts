import { SolidObjectConfig } from "@vis-three/module-solid-object";
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
export interface LineSegmentsConfig extends LineConfig {
}
export interface LineFatConfig extends SolidObjectConfig {
}
export interface LineSegmentsFatConfig extends SolidObjectConfig {
}
export declare const getLineConfig: () => LineConfig;
export declare const getLineSegmentsConfig: () => LineSegmentsConfig;
export declare const getLineFatConfig: () => LineFatConfig;
export declare const getLineSegmentsFatConfig: () => LineSegmentsFatConfig;
