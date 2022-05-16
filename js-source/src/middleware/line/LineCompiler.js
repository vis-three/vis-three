import { BoxBufferGeometry, Line, LineBasicMaterial, } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, } from "../solidObject/SolidObjectCompiler";
export class LineCompiler extends SolidObjectCompiler {
    COMPILER_NAME = MODULETYPE.LINE;
    replaceMaterial = new LineBasicMaterial({
        color: "rgb(150, 150, 150)",
    });
    replaceGeometry = new BoxBufferGeometry(10, 10, 10);
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
        const object = new Line();
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
//# sourceMappingURL=LineCompiler.js.map