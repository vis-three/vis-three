import { BufferGeometry as c } from "three";
import { CSG as e } from "three-csg-ts";
class y {
  constructor(t) {
    this.visible = !0, t.visible && (this.visible = t.visible);
  }
}
class u extends y {
  constructor(t) {
    super(t), this.modifiedGeometry = new c(), this.timer = 0, this.throttling = 1e3 / 15, t.source && (this.source = t.source), t.target && (this.target = t.target), this.mode = t.mode || "subtract";
  }
  set source(t) {
    this._source = t, this.originalGeometry = this._source.geometry, this.modifiedGeometry.copy(this.originalGeometry), this.source.geometry = this.modifiedGeometry;
  }
  get source() {
    return this._source;
  }
  modify() {
    if (this._source && this.target) {
      const t = this._source, o = {
        geometry: this.originalGeometry,
        matrix: this.source.matrixWorld
      }, s = {
        geometry: this.target.geometry,
        matrix: this.target.matrixWorld
      }, r = e.fromMesh(o), h = e.fromMesh(s), m = e.toGeometry(
        r[this.mode](h),
        t.matrixWorld
      );
      this.modifiedGeometry.copy(m);
    }
  }
  render() {
    this.visible ? this.timer || (this.timer = window.setTimeout(() => {
      this.modify(), this.timer = 0;
    }, this.throttling)) : this.modifiedGeometry.copy(this.originalGeometry);
  }
  apply() {
    this.originalGeometry.copy(this.modifiedGeometry), this.source.geometry = this.originalGeometry;
  }
  dispose() {
    this.source.geometry = this.originalGeometry, this.modifiedGeometry.dispose();
  }
}
export {
  u as BooleanModifier,
  y as Modifier
};
