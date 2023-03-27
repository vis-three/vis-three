import { EngineSupport } from "@vis-three/middleware";
export interface CameraEngineSupport extends EngineSupport {
    setCameraBySymbol: (camera: string) => this;
}
export default function (engine: CameraEngineSupport): void;
