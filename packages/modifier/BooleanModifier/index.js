import { BoxBufferGeometry } from "three";
import { CSG } from "three-csg-ts";
import { Modifier } from "@vis-three/modifier-base";
export class BooleanModifier extends Modifier {
    _source;
    target;
    mode;
    originalGeometry;
    modifiedGeometry = new BoxBufferGeometry();
    constructor(parameters) {
        super(parameters);
        parameters.source && (this.source = parameters.source);
        parameters.target && (this.target = parameters.target);
        this.mode = parameters.mode || "subtract";
    }
    set source(value) {
        this._source = value;
        this.originalGeometry = this._source.geometry;
        this.source.geometry = this.modifiedGeometry;
    }
    get source() {
        return this._source;
    }
    modify() {
        if (this._source && this.target) {
            const source = this._source;
            const likeMesh = {
                geometry: this.originalGeometry,
                matrix: this.source.matrix,
            };
            const csgSource = CSG.fromMesh(likeMesh);
            const csgTarget = CSG.fromMesh(this.target);
            const csgGeometry = CSG.toGeometry(csgSource[this.mode](csgTarget), source.matrix);
            this.modifiedGeometry.copy(csgGeometry);
        }
    }
    render() {
        if (this.visible) {
            this.modify();
        }
        else {
            this.modifiedGeometry.copy(this.originalGeometry);
        }
    }
    apply() {
        this.originalGeometry.copy(this.modifiedGeometry);
        this.source.geometry = this.originalGeometry;
    }
    dispose() {
        this.source.geometry = this.originalGeometry;
        this.modifiedGeometry.dispose();
    }
}
