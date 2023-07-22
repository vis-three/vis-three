import { EngineSupport } from "@vis-three/middleware";
import { LoadTextureConfig } from "./TextureConfig";
export interface TextureModuleEngine extends EngineSupport {
    generateLoadTextureConfig: (url: string) => LoadTextureConfig | null;
}
export default function (engine: TextureModuleEngine): void;
