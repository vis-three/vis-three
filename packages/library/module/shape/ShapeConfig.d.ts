import { BasicConfig } from "@vis-three/tdcm";
export interface ShapeConfig extends BasicConfig {
    /**路径vid标识 */
    shape: string;
    /**路径vid标识 */
    holes: string[];
}
export declare const getShapeConfig: () => ShapeConfig;
