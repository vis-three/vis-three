import { CanvasTexture, Points, PointsMaterial } from "three";
import { CanvasGenerator } from "../../../convenient/CanvasGenerator";
export class PointsHelper extends Points {
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
    type = "VisPointsHelper";
    constructor(points) {
        super();
        this.target = points;
        this.geometry.dispose();
        this.geometry.copy(points.geometry);
        this.material.dispose();
        this.material = new PointsMaterial({
            color: "rgb(255, 255, 255)",
            alphaMap: PointsHelper.alphaTexture,
            transparent: true,
        });
        const material = Array.isArray(points.material)
            ? points.material[0]
            : points.material;
        if (material instanceof PointsMaterial) {
            this.material.size = material.size;
            this.material.sizeAttenuation =
                material.sizeAttenuation;
        }
        this.matrixAutoUpdate = false;
        this.matrixWorldNeedsUpdate = false;
        this.matrix = points.matrix;
        this.matrixWorld = points.matrixWorld;
        // TODO:update
        this.raycast = () => { };
    }
}
//# sourceMappingURL=PointsHelper.js.map