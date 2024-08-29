import { MagnificationTextureFilter, Mapping, PixelFormat, Texture, TextureDataType, TextureFilter, Wrapping } from "three";
export declare class ImageTexture extends Texture {
    constructor(image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement, mapping?: Mapping, wrapS?: Wrapping, wrapT?: Wrapping, magFilter?: MagnificationTextureFilter, minFilter?: TextureFilter, format?: PixelFormat, type?: TextureDataType, anisotropy?: number);
}
