import { BoxBufferGeometry, BufferGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import { Modifier, ModifierParameters } from "@vis-three/modifier-base";

export interface BooleanModifierParameters extends ModifierParameters {
  source?: Mesh;
  target?: Mesh;
  mode?: "subtract" | "union" | "intersect";
}

export class BooleanModifier extends Modifier {
  _source!: Mesh;
  target!: Mesh;
  mode: "subtract" | "union" | "intersect";

  private originalGeometry!: BufferGeometry;
  private modifiedGeometry: BufferGeometry = new BoxBufferGeometry();

  private timer = 0;
  private throttling = 1000 / 15;

  constructor(parameters: BooleanModifierParameters) {
    super(parameters);
    parameters.source && (this.source = parameters.source);
    parameters.target && (this.target = parameters.target);

    this.mode = parameters.mode || "subtract";
  }

  set source(value: Mesh) {
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
      } as Mesh;

      const csgSource = CSG.fromMesh(likeMesh);
      const csgTarget = CSG.fromMesh(this.target);
      const csgGeometry = CSG.toGeometry(
        csgSource[this.mode](csgTarget),
        source.matrix
      );
      this.modifiedGeometry.copy(csgGeometry);
    }
  }

  render() {
    if (this.visible) {
      if (!this.timer) {
        this.timer = window.setTimeout(() => {
          this.modify();
          this.timer = 0;
        }, this.throttling);
      }
    } else {
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
