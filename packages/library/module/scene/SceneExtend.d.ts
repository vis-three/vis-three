import { EngineSupport } from "@vis-three/tdcm";
export interface SceneEngineSupport extends EngineSupport {
    setSceneBySymbol: (scene: string) => this;
}
export default function (engine: SceneEngineSupport): void;
