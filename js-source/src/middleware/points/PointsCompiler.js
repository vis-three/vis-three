import { DodecahedronBufferGeometry, Points, PointsMaterial, } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, } from "../solidObject/SolidObjectCompiler";
export class PointsCompiler extends SolidObjectCompiler {
    MODULE = MODULETYPE.POINTS;
    replaceMaterial = new PointsMaterial({ color: "rgb(150, 150, 150)" });
    replaceGeometry = new DodecahedronBufferGeometry(5);
    constructor() {
        super();
    }
    getReplaceMaterial() {
        return this.replaceMaterial;
    }
    getReplaceGeometry() {
        return this.replaceGeometry;
    }
    add(vid, config) {
        const object = new Points();
        this.map.set(vid, object);
        this.weakMap.set(object, vid);
        super.add(vid, config);
        return this;
    }
    dispose() {
        super.dispose();
        this.replaceGeometry.dispose();
        this.replaceMaterial.dispose();
        return this;
    }
}
//# sourceMappingURL=PointsCompiler.js.map