import { CubeTexture } from "three";
import { CubeTextureConfig } from "../TextureConfig";
import { TextureModelShared } from "./TextureModel";
declare const _default: import("@vis-three/tdcm").ModelOption<CubeTextureConfig, CubeTexture, {}, TextureModelShared & {
    imageHanlder: ({ model, target, index, value, engine }: any) => void;
}, import("..").TextureEngineSupport, import("@vis-three/tdcm").Compiler<import("..").TextureEngineSupport>>;
export default _default;
