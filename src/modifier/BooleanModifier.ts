import { BufferGeometry, Matrix4, Mesh } from "three";
import { CSG } from "three-csg-ts";
import { Modifier, ModifierParameters } from "./Modifier";

export interface BooleanModifierParameters extends ModifierParameters {
  source: Mesh;
  target: Mesh;
  mode?: "subtract" | "union" | "intersect";
}

export class BooleanModifier extends Modifier {
  private source: Mesh;
  private target: Mesh;
  private mode: "subtract" | "union" | "intersect";

  private cacheSourceMatrix: Matrix4;
  private cacheTargetMatrix: Matrix4;

  private cacheSoruceGeometryUuid: string;
  private cacheTargetGeometryUuid: string;

  private originalGeometry: BufferGeometry;
  private modifiedGeometry: BufferGeometry;

  constructor(parameters: BooleanModifierParameters) {
    super(parameters);
    this.source = parameters.source;
    this.target = parameters.target;
    this.mode = parameters.mode || "subtract";

    this.cacheSourceMatrix = this.source.matrix.clone();
    this.cacheTargetMatrix = this.target.matrix.clone();

    this.cacheSoruceGeometryUuid = this.source.geometry.uuid;
    this.cacheTargetGeometryUuid = this.target.geometry.uuid;

    this.originalGeometry = this.source.geometry;
    this.modifiedGeometry = new BufferGeometry();

    this.modify();
    this.source.geometry = this.modifiedGeometry;
  }

  private async modify() {
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
    this.modifiedGeometry.uuid = csgGeometry.uuid;
  }

  //TODO: 性能优化，通过object.eventDispatcher更新render
  render() {
    if (this.visible) {
      // 判断物体位置更新以及几何更新
      if (!this.cacheSourceMatrix.equals(this.source.matrix)) {
        this.modify();
        this.cacheSourceMatrix.copy(this.source.matrix);
        return;
      }

      if (!this.cacheTargetMatrix.equals(this.target.matrix)) {
        this.modify();
        this.cacheTargetMatrix.copy(this.target.matrix);
        return;
      }

      if (this.originalGeometry.uuid !== this.cacheSoruceGeometryUuid) {
        this.modify();
        this.cacheSoruceGeometryUuid = this.originalGeometry.uuid;
        return;
      }

      if (this.target.geometry.uuid !== this.cacheTargetGeometryUuid) {
        this.modify();
        this.cacheTargetGeometryUuid = this.target.geometry.uuid;
        return;
      }
    } else {
      this.modifiedGeometry.copy(this.originalGeometry);
    }
  }

  use() {
    this.originalGeometry.copy(this.modifiedGeometry);
    this.originalGeometry.uuid = this.modifiedGeometry.uuid;
    this.source.geometry = this.originalGeometry;
  }

  dispose() {
    this.source.geometry = this.originalGeometry;
    this.modifiedGeometry.dispose();
  }
}
