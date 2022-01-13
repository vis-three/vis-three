import { Texture } from "three";
export class ImageTexture extends Texture {
    constructor(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {
        super(image, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);
    }
}
//# sourceMappingURL=ImageTexture.js.map