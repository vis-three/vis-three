import { BufferGeometry, Mesh } from "three";
import { CSG } from "three-csg-ts";
import { Modifier, ModifierParameters } from "@vis-three/modifier-base";

export interface BooleanModifierParameters extends ModifierParameters {
  source: Mesh;
  target: Mesh;
  mode?: "subtract" | "union" | "intersect";
}

export class BooleanModifier extends Modifier {
  source: Mesh;
  target: Mesh;
  mode: "subtract" | "union" | "intersect";

  private originalGeometry: BufferGeometry;
  private modifiedGeometry: BufferGeometry = new BufferGeometry();

  constructor(parameters: BooleanModifierParameters) {
    super(parameters);
    this.source = parameters.source;
    this.target = parameters.target;

    this.mode = parameters.mode || "subtract";

    this.originalGeometry = this.source.geometry;

    this.modify();
    this.source.geometry = this.modifiedGeometry;
  }

  private modify() {
    const source = this.source;
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

  render() {
    if (this.visible) {
      this.modify();
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
