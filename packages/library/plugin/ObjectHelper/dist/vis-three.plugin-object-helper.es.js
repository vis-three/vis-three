import { EventDispatcher as j, ENGINE_EVENT as u } from "@vis-three/core";
import { Material as E, Scene as c } from "three";
import { PointLightHelper as m, SpotLightHelper as S, DirectionalLightHelper as v, RectAreaLightHelper as g, CameraHelper as H, MeshHelper as L, GroupHelper as O, SpriteHelper as M, PointsHelper as y, LineHelper as F, CSS3DPlaneHelper as D, CSS3DSpriteHelper as C, CSS2DPlaneHelper as P } from "@vis-three/module-helper";
import { transPkgName as R } from "@vis-three/utils";
class G extends j {
  constructor(e = {}) {
    super(), this.helperGenerator = {
      PointLight: m,
      SpotLight: S,
      DirectionalLight: v,
      RectAreaLight: g,
      PerspectiveCamera: H,
      OrthographicCamera: H,
      Mesh: L,
      Group: O,
      Sprite: M,
      Points: y,
      Line: F,
      CSS3DPlane: D,
      CSS3DSprite: C,
      CSS2DPlane: P
    }, this.helperFilter = {
      AmbientLight: !0,
      HemisphereLight: !0,
      Object3D: !0,
      TransformControls: !0,
      Scene: !0
    }, this.objectFilter = /* @__PURE__ */ new Set(), this.objectHelperMap = /* @__PURE__ */ new Map(), e.helperGenerator && (this.helperGenerator = Object.assign(
      this.helperGenerator,
      e.helperGenerator
    )), e.helperFilter && (this.helperFilter = Object.assign(
      this.helperFilter,
      e.helperFilter
    )), e.objectFilter && (this.objectFilter = new Set(
      e.objectFilter.concat(Array.from(this.objectFilter))
    ));
  }
  /**
   * @description: 添加过滤的物体
   * @param {Object3D} objects three object
   * @return {this} this
   */
  addFilteredObject(...e) {
    for (const t of e)
      this.objectFilter.add(t);
    return this;
  }
  /**
   * @description:添加物体辅助
   * @param {Object3D} obejct three object
   * @return {Object3D | null} three object or null
   */
  addObjectHelper(e) {
    if (this.objectFilter.has(e) || this.objectHelperMap.has(e) || this.helperFilter[e.type] || e.type.toLocaleLowerCase().includes("helper"))
      return null;
    if (!this.helperGenerator[e.type])
      return console.warn(
        `object helper can not support this type object: '${e.type}'`
      ), null;
    const t = new this.helperGenerator[e.type](e);
    return this.objectHelperMap.set(e, t), t;
  }
  /**
   * @description: 销毁物体辅助
   * @param {Object3D} object three object
   * @return {*} three object or null
   */
  disposeObjectHelper(e) {
    if (this.objectFilter.has(e) || this.helperFilter[e.type] || e.type.toLocaleLowerCase().includes("helper"))
      return null;
    if (!this.objectHelperMap.has(e))
      return console.warn(
        "object helper manager can not found this object`s helper: ",
        e
      ), null;
    const t = this.objectHelperMap.get(e);
    return t.geometry && t.geometry.dispose(), t.material && (t.material instanceof E ? t.material.dispose() : t.material.forEach((p) => {
      p.dispose();
    })), this.objectHelperMap.delete(e), t;
  }
  /**
   * 释放所有管理器资源
   */
  dispose() {
    for (const e of this.objectHelperMap.keys())
      this.disposeObjectHelper(e);
    this.objectHelperMap.clear();
  }
}
const w = "@vis-three/plugin-object-helper", d = "afterAdd", f = "afterRemove";
c.prototype.add = function(...s) {
  if (!arguments.length)
    return this;
  if (arguments.length > 1) {
    for (let t = 0; t < arguments.length; t++)
      this.add(arguments[t]);
    return this;
  }
  const e = s[0];
  if (e === this)
    return console.error(
      "THREE.Object3D.add: object can't be added as a child of itself.",
      s
    ), this;
  if (e && e.isObject3D) {
    if (e.parent !== null) {
      const t = this.children.indexOf(e);
      t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent({ type: "removed" }));
    }
    e.parent = this, this.children.push(e), e.dispatchEvent({ type: "added" });
  } else
    console.error(
      "THREE.Object3D.add: object not an instance of THREE.Object3D.",
      s
    );
  return this;
};
const A = c.prototype.add, T = c.prototype.remove;
c.prototype.add = function(...s) {
  return A.call(this, ...s), this.dispatchEvent({
    // @ts-ignore
    type: d,
    objects: s
  }), this;
};
c.prototype.remove = function(...s) {
  return T.call(this, ...s), this.dispatchEvent({
    // @ts-ignore
    type: f,
    objects: s
  }), this;
};
const N = R(w), V = function() {
  let s, e, t;
  const p = /* @__PURE__ */ new WeakSet();
  return {
    name: N,
    install(n) {
      const o = new G(), h = o.objectHelperMap;
      n.objectHelperManager = o, n.setObjectHelper = function(i) {
        if (i)
          this.scene.traverse((r) => {
            h.has(r) && this.scene.add(h.get(r));
          });
        else
          for (let r = 0; r < this.scene.children.length; r++) {
            const l = this.scene.children[r];
            h.has(l) && this.scene.remove(h.get(l));
          }
        return this;
      };
      const b = (i) => {
        p.has(i) || (i.traverse((r) => {
          const l = o.addObjectHelper(r);
          l && i.add(l);
        }), p.add(i));
      };
      e = (i) => {
        const r = i.objects;
        for (const l of r) {
          const a = o.addObjectHelper(l);
          a && n.scene.add(a);
        }
      }, t = (i) => {
        const r = i.objects;
        for (const l of r) {
          const a = o.disposeObjectHelper(l);
          a && n.scene.remove(a);
        }
      }, n.scene.addEventListener(d, e), n.scene.addEventListener(f, t), s = (i) => {
        const r = i.scene;
        !p.has(r) && b(r), r.hasEventListener(d, e) || r.addEventListener(d, e), r.hasEventListener(f, t) || r.addEventListener(f, t);
      }, n.addEventListener(
        u.SETSCENE,
        s
      );
    },
    dispose(n) {
      n.objectHelperManager.objectHelperMap.forEach((o) => {
        o.parent && o.parent.remove(o);
      }), n.objectHelperManager.dispose(), delete n.objectHelperManager, delete n.setObjectHelper, n.removeEventListener(
        u.SETSCENE,
        s
      );
    }
  };
};
export {
  d as AFTERADD,
  f as AFTERREMOVE,
  N as OBJECT_HELPER_PLUGIN,
  G as ObjectHelperManager,
  V as ObjectHelperPlugin
};
