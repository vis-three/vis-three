import { EngineSupport } from "@vis-three/tdcm";
/**
 * 相机模块提供的引擎拓展支持
 */
export interface CameraEngineSupport extends EngineSupport {
    /**通过vid设置engine的当前相机 */
    setCameraBySymbol: (camera: string) => this;
}
export default function (engine: CameraEngineSupport): void;
