import { CanvasTexture, Sprite, SpriteMaterial } from "three";
import { CanvasGenerator } from "../../../convenient/CanvasGenerator";
export class SpriteHelper extends Sprite {
    static alphaTexture = new CanvasTexture(new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" })
        .draw((ctx) => {
        ctx.beginPath();
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, 512, 512);
        ctx.closePath();
    })
        // .preview({
        //   left: "50%",
        // })
        .get());
    target;
    // @ts-ignore
    type = "VisSpriteHelper";
    constructor(sprite) {
        super();
        this.target = sprite;
        this.geometry.dispose();
        this.geometry.copy(sprite.geometry);
        this.material.dispose();
        this.material = new SpriteMaterial({
            color: "rgb(255, 255, 255)",
            alphaMap: SpriteHelper.alphaTexture,
            transparent: true,
        });
        this.matrixAutoUpdate = false;
        this.matrixWorldNeedsUpdate = false;
        this.matrix = sprite.matrix;
        this.matrixWorld = sprite.matrixWorld;
        this.raycast = () => { };
    }
}
//# sourceMappingURL=SpriteHelper.js.map