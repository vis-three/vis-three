import { EngineSupport } from "@vis-three/tdcm";
import { LoadTextureConfig } from "./TextureConfig";
export interface TextureEngineSupport extends EngineSupport {
    generateLoadTextureConfig: (url: string) => LoadTextureConfig | null;
}
export default function (engine: TextureEngineSupport): void;
