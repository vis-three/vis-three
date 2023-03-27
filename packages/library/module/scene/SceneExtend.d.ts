import { EngineSupport } from "@vis-three/middleware";
export interface SceneEngineSupport extends EngineSupport {
    setSceneBySymbol: (scene: string) => this;
}
export default function (engine: SceneEngineSupport): void;
