import { BufferGeometry } from "three";
export class CurveGeometry extends BufferGeometry {
    parameters;
    constructor(path = [], divisions = 36, space = true) {
        super();
        this.type = "CurveGeometry";
        this.parameters = {
            path: path.map((vector3) => vector3.clone()),
            space,
            divisions,
        };
    }
}
//# sourceMappingURL=CurveGeometry.js.map