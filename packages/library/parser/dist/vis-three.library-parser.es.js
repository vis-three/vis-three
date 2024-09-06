import { Vector3 as b, Bone as v, Texture as A } from "three";
import { syncObject as p } from "@vis-three/utils";
import { Parser as c, CONFIG_FACTORY as o, CONFIG_TYPE as m, createSymbol as h } from "@vis-three/tdcm";
class f extends c {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => t.isObject3D && s.get(f) || null;
  }
  parse(e) {
    this.parseObject3D(e);
  }
  parseAnimation({ url: e, resource: t, configMap: s, resourceMap: r }) {
    r.set(e, t);
    const n = o[m.LOADANIMATIONCLIP]();
    n.vid = h(), n.url = e, n.name = t.name, s.set(e, n);
  }
  /**
   * 解析颜色
   * @param color
   * @returns examples - rgb(255, 255,255)
   */
  parseColor(e) {
    return `rgb(${Math.round(255 * e.r)}, ${Math.round(
      255 * e.g
    )}, ${Math.round(255 * e.b)})`;
  }
  /**
   * 对象增强,class对象的get set属性转key， three中的是通过_key进行闭包
   * @param object
   * @returns object
   */
  attributeEnhance(e) {
    const t = {};
    for (const s in e)
      s.startsWith("_") ? t[s.slice(1)] = e[s] : t[s] = e[s];
    return t;
  }
  /**
   *  解析贴图
   * @param params
   */
  parseTexture({ url: e, resource: t, configMap: s, resourceMap: r }) {
    r.set(e, t);
    const n = o[m.LOADTEXTURE]();
    s.set(e, n), n.vid = h(), n.url = e, p(
      t,
      n,
      {
        type: !0,
        vid: !0,
        url: !0
      }
    );
  }
  parseMaterial({
    url: e,
    resource: t,
    configMap: s,
    resourceMap: r
  }) {
    if (r.set(e, t), !o[t.type]) {
      console.warn(
        "can not found support config in vis for this resource",
        t
      );
      return;
    }
    const n = o[t.type]();
    s.set(e, n), n.vid = h(), p(
      this.attributeEnhance(t),
      n,
      {
        type: !0,
        vid: !0
      }
    );
    for (const i in t)
      if (t[i]) {
        if (t[i].isColor)
          n[i] = this.parseColor(t[i]);
        else if (i.toLocaleLowerCase().endsWith("map") && t[i]) {
          const a = `${e}.${i}`;
          this.parseTexture({
            url: a,
            resource: t[i],
            configMap: s,
            resourceMap: r
          }), n[i] = s.get(a).vid;
        }
      }
  }
  parseGeometry({
    url: e,
    resource: t,
    configMap: s,
    resourceMap: r
  }) {
    r.set(e, t), t.computeBoundingBox();
    const n = t.boundingBox, i = n.getCenter(new b()), a = o[m.LOADGEOMETRY]();
    a.vid = h(), a.url = e, a.position.x = i.x / (n.max.x - n.min.x) * 2, a.position.y = i.y / (n.max.y - n.min.y) * 2, a.position.z = i.z / (n.max.z - n.min.z) * 2, s.set(e, a);
  }
  parseSkeleton({
    url: e,
    resource: t,
    configMap: s,
    resourceMap: r
  }) {
    const n = o[m.SKELETON]();
    n.vid = h();
    const i = /* @__PURE__ */ new WeakMap();
    for (const [a, l] of r.entries())
      l instanceof v && i.set(l, s.get(a));
    for (const a of t.bones) {
      if (!i.has(a)) {
        console.warn("object3D parser can not fond bone in configMap", a);
        continue;
      }
      n.bones.push(i.get(a).vid);
    }
    t.boneInverses.length && (n.boneInverses = t.boneInverses.map(
      (a) => [].concat(a.elements)
    )), s.set(e, n);
  }
  parseObject3D({
    url: e,
    resource: t,
    configMap: s,
    resourceMap: r
  }) {
    if (r.set(e, t), !o[t.type]) {
      console.warn(
        "can not found support config in middleware module for this resource",
        t
      );
      return;
    }
    const n = o[t.type]();
    if (n.vid = h(), p(
      t,
      n,
      {
        type: !0,
        vid: !0,
        children: !0,
        geometry: !0,
        material: !0,
        parent: !0,
        lookAt: !0,
        // load object是没有lookAt的
        skeleton: !0
      }
    ), n.rotation.x = t.rotation.x, n.rotation.y = t.rotation.y, n.rotation.z = t.rotation.z, t.isMesh && t.morphTargetInfluences && t.morphTargetInfluences.length && (n.morphTargetInfluences = [
      ...t.morphTargetInfluences
    ], n.morphTargetDictionary = {
      ...t.morphTargetDictionary
    }), t.isSkinnedMesh && (n.bindMatrix = [].concat(t.bindMatrix.elements)), s.set(e, n), t.material)
      if (Array.isArray(t.material))
        n.material = [], t.material.forEach((i, a, l) => {
          const d = `${e}.material.${a}`;
          this.parseMaterial({
            url: d,
            resource: i,
            configMap: s,
            resourceMap: r
          }), n.material.push(s.get(d).vid);
        });
      else {
        const i = `${e}.material`;
        this.parseMaterial({
          url: i,
          resource: t.material,
          configMap: s,
          resourceMap: r
        }), n.material = s.get(i).vid;
      }
    if (t.geometry) {
      const i = `${e}.geometry`;
      this.parseGeometry({
        url: i,
        resource: t.geometry,
        configMap: s,
        resourceMap: r
      }), n.geometry = s.get(i).vid;
    }
    if (t.skeleton) {
      const i = `${e}.skeleton`;
      this.parseSkeleton({
        url: i,
        resource: t.skeleton,
        configMap: s,
        resourceMap: r
      }), n.skeleton = s.get(i).vid;
    }
    if (t.children && t.children.length) {
      const i = [];
      t.children.forEach((a, l) => {
        a.type === "Bone" ? i.unshift({
          index: l,
          object: a,
          type: a.type
        }) : i.push({
          index: l,
          object: a,
          type: a.type
        });
      }), i.forEach((a) => {
        const l = `${e}.children.${a.index}`;
        this.parseObject3D({
          url: l,
          resource: a.object,
          configMap: s,
          resourceMap: r
        }), n.children.push(s.get(l).vid);
      });
    }
    t.animations && t.animations.length && Array.isArray(t.animations) && t.animations.forEach((i, a) => {
      const l = `${e}.animations.${a}`;
      this.parseAnimation({
        url: l,
        resource: i,
        configMap: s,
        resourceMap: r
      });
    });
  }
}
class I extends f {
  constructor() {
    super();
  }
}
class u extends c {
  constructor() {
    super(), this.object3DParser = new f(), this.selector = (e, t, s) => t.parser && t.animations && t.scene && t.scenes && s.get(u) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: r }) {
    this.object3DParser.parse({
      url: `${e}.scene`,
      resource: t.scene,
      configMap: s,
      resourceMap: r
    }), t.animations.forEach((n, i) => {
      this.object3DParser.parseAnimation({
        url: `${e}.animations.${i}`,
        resource: n,
        configMap: s,
        resourceMap: r
      });
    });
  }
}
class g extends c {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => t instanceof HTMLCanvasElement && s.get(g) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: r }) {
    const n = o[m.CANVASTEXTURE]();
    n.url = e, r.set(e, t), s.set(e, n);
  }
}
class y extends c {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => t instanceof HTMLImageElement && s.get(y) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: r }) {
    const n = o[m.IMAGETEXTURE]();
    n.url = e, r.set(e, t), s.set(e, n);
  }
}
class x extends c {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => t instanceof HTMLVideoElement && s.get(x) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: r }) {
    const n = o[m.VIDEOTEXTURE]();
    n.url = e, r.set(e, t), s.set(e, n);
  }
}
class E extends c {
  constructor() {
    super(...arguments), this.selector = (e, t, s) => t instanceof A && s.get(E) || null;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: r }) {
    const n = o[m.LOADTEXTURE]();
    n.url = e, r.set(e, t), s.set(e, n);
  }
}
class T extends c {
  constructor(e = "css3D") {
    super(), this.selector = (t, s, r) => s instanceof HTMLElement && r.get(T) || null, this.type = e;
  }
  parse({ url: e, resource: t, configMap: s, resourceMap: r }) {
    const n = o[this.type === "css3D" ? m.CSS3DPLANE : m.CSS2DPLANE]();
    n.element = e, r.set(e, t), s.set(e, n);
  }
}
export {
  I as FBXResourceParser,
  u as GLTFResourceParser,
  g as HTMLCanvasElementParser,
  T as HTMLElementParser,
  y as HTMLImageElementParser,
  x as HTMLVideoElementParser,
  f as Object3DParser,
  E as TextureParser
};
