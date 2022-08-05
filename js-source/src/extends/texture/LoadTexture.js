import { Texture } from "three";
export class LoadTexture extends Texture {
    constructor(texture) {
        super();
        Object.keys(texture).forEach((key) => {
            this[key] = texture[key];
        });
    }
}
//# sourceMappingURL=LoadTexture.js.map