import { LinearFilter, RGBFormat, Texture } from "three";
export class VideoTexture extends Texture {
    isVideoTexture = true;
    constructor(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy) {
        super(video, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy);
        this.format = format !== undefined ? format : RGBFormat;
        this.minFilter = minFilter !== undefined ? minFilter : LinearFilter;
        this.magFilter = magFilter !== undefined ? magFilter : LinearFilter;
        this.generateMipmaps = false;
    }
    clone() {
        //@ts-ignore
        return new this.constructor(this.image).copy(this);
    }
    update() {
        const video = this.image;
        const hasVideoFrameCallback = 'requestVideoFrameCallback' in video;
        if (hasVideoFrameCallback) {
            this.needsUpdate = true;
        }
        else if (hasVideoFrameCallback === false && video.readyState >= video.HAVE_CURRENT_DATA) {
            this.needsUpdate = true;
        }
    }
}
//# sourceMappingURL=VideoTexture.js.map