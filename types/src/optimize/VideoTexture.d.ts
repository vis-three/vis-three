import { Mapping, PixelFormat, Texture, TextureDataType, TextureFilter, Wrapping } from "three";
export declare class VideoTexture extends Texture {
    isVideoTexture: boolean;
    constructor(video: HTMLVideoElement, mapping?: Mapping, wrapS?: Wrapping, wrapT?: Wrapping, magFilter?: TextureFilter, minFilter?: TextureFilter, format?: PixelFormat, type?: TextureDataType, anisotropy?: number);
    clone(): any;
    update(): void;
}
