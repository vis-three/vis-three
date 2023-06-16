import { SolidObjectConfig } from "@vis-three/module-solid-object";
/**
 * 直线物体配置
 */
export interface LineConfig extends SolidObjectConfig {
    /**材质vid标识 */
    material: string;
    /**几何vid标识 */
    geometry: string;
    /**是否计算距离数组，如果当前的使用材质是`LineDashedMaterial`请打开 */
    computeLineDistances: boolean;
}
/**
 * 获取直线物体配置 - 其他属性继承`getSolidObjectConfig`并会与之合并。
 * @returns
 * @example
 * {
    type: "Line",
    geometry: "",
    material: "",
    computeLineDistances: false,
  }
 */
export declare const getLineConfig: () => LineConfig;
