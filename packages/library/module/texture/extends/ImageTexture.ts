import {
  MagnificationTextureFilter,
  Mapping,
  PixelFormat,
  Texture,
  TextureDataType,
  TextureFilter,
  Wrapping,
} from "three";

export class ImageTexture extends Texture {
  constructor(
    image?: HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    mapping?: Mapping,
    wrapS?: Wrapping,
    wrapT?: Wrapping,
    magFilter?: MagnificationTextureFilter,
    minFilter?: TextureFilter,
    format?: PixelFormat,
    type?: TextureDataType,
    anisotropy?: number
  ) {
    super(
      image,
      mapping,
      wrapS,
      wrapT,
      magFilter,
      minFilter,
      format,
      type,
      anisotropy
    );
  }
}
