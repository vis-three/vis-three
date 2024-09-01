import { getBasicConfig as I, defineModel as _, MODEL_EVENT as E, defineModule as k, SUPPORT_LIFE_CYCLE as Y } from "@vis-three/tdcm";
import { EventDispatcher as q } from "@vis-three/core";
import { LineBasicMaterial as A, LineSegments as c, BufferGeometry as p, Float32BufferAttribute as u, CameraHelper as J, Matrix4 as K, PerspectiveCamera as Q, OrthographicCamera as X, Color as b, PlaneGeometry as d, EdgesGeometry as l, Sphere as V, Vector3 as y, Mesh as Z, OctahedronGeometry as G, MeshBasicMaterial as L, Box3 as C, Points as R, BufferAttribute as U, PointsMaterial as v, AlwaysDepth as $, CanvasTexture as H, ShaderMaterial as T, Sprite as ee, SpriteMaterial as te, Vector2 as ie } from "three";
import { CanvasGenerator as W } from "@vis-three/convenient";
const m = () => new A({ color: "rgb(255, 255, 255)" });
class N extends c {
  constructor(e) {
    super(), this.type = "CameraHelper";
    const t = new p(), i = [
      0,
      0,
      0,
      -1,
      1,
      -1,
      0,
      0,
      0,
      -1,
      1,
      1,
      0,
      0,
      0,
      -1,
      -1,
      -1,
      0,
      0,
      0,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      -1,
      -1,
      1,
      1,
      -1,
      1,
      1,
      -1,
      -1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      -1,
      0,
      0,
      0,
      0,
      -1,
      -1,
      0,
      0,
      0,
      0,
      -1,
      1,
      0,
      1,
      1,
      0,
      1,
      -1,
      0,
      1,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      -1,
      0,
      -1,
      1,
      0,
      -1,
      1,
      0,
      1,
      1,
      0,
      -1,
      1,
      2,
      -1,
      1,
      0,
      1,
      -1,
      2,
      1,
      -1,
      0,
      -1,
      -1,
      2,
      -1,
      -1,
      0,
      1,
      1,
      2,
      1,
      1,
      2,
      1,
      1,
      2,
      -1,
      1,
      2,
      -1,
      1,
      2,
      -1,
      -1,
      2,
      -1,
      -1,
      2,
      1,
      -1,
      2,
      1,
      -1,
      2,
      1,
      1
    ];
    t.setAttribute("position", new u(i, 3)), t.rotateY(-90 * Math.PI / 180), t.computeBoundingBox();
    const s = new J(e);
    s.matrix = new K(), s.matrixAutoUpdate = !0, s.raycast = () => {
    }, this.add(s), this.shape = s, this.geometry = t, this.material = m(), this.target = e, this.matrixAutoUpdate = !1, this.matrix = e.matrix, e instanceof Q ? this.cachaData = {
      fov: e.fov,
      aspect: e.aspect,
      near: e.near,
      far: e.far
    } : e instanceof X ? this.cachaData = {
      left: e.left,
      right: e.right,
      top: e.top,
      bottom: e.bottom,
      near: e.near,
      far: e.far
    } : this.cachaData = {}, this.onBeforeRender = () => {
      let r = !1;
      const a = this.cachaData;
      Object.keys(a).forEach((n) => {
        a[n] !== e[n] && (a[n] = e[n], r = !0);
      }), r && this.shape.update();
    };
  }
  raycast(e, t) {
    const i = this.matrixWorld, s = this.geometry.boundingBox.clone();
    if (s.applyMatrix4(i), e.ray.intersectsBox(s)) {
      const r = this.target;
      t.push({
        distance: e.ray.origin.distanceTo(r.position),
        object: r,
        point: r.position
      });
    }
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.shape.dispose();
  }
}
class se extends c {
  constructor(e) {
    super(), this.type = "VisDirectionalLightHelper", this.geometry = new p();
    const t = [
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0.707,
      0.707,
      0,
      -0.707,
      -0.707,
      0,
      0.707
    ];
    this.geometry.setAttribute(
      "position",
      new u(t, 3)
    ), this.material = m(), this.geometry.boundingSphere;
    const i = new b().copy(e.color).multiplyScalar(e.intensity), s = new d(20, 20);
    s.dispose();
    const r = new c(
      new l(s),
      new A({
        color: i
      })
    );
    r.raycast = () => {
    }, this.shape = r, this.target = e, this.sphere = new V(new y(0, 0, 0), 1), this.cacheColor = e.color.getHex(), this.cacheVector3 = new y(), this.add(this.shape), this.matrixAutoUpdate = !1, this.matrix = e.matrix, this.matrixWorldNeedsUpdate = !1, this.matrixWorld = e.matrixWorld, this.onBeforeRender = () => {
      const a = this.target, n = this.shape;
      a.color.getHex() !== this.cacheColor && (n.material.color.copy(a.color).multiplyScalar(a.intensity), this.cacheColor = a.color.getHex()), n.lookAt(a.target.position);
    };
  }
  raycast(e, t) {
    const i = this.target, s = i.matrixWorld, r = this.sphere;
    r.set(this.cacheVector3.set(0, 0, 0), 1), r.applyMatrix4(s), e.ray.intersectsSphere(r) && t.push({
      distance: e.ray.origin.distanceTo(i.position),
      object: i,
      point: i.position
    });
  }
  dispose() {
    this.shape.geometry.dispose(), this.shape.material.dispose(), this.geometry.dispose(), this.material.dispose();
  }
}
class oe extends c {
  //TODO: 手动更新api，自动更新api，support更新
  constructor(e) {
    super(), this.type = "VisPointLightHelper", this.geometry = new p();
    const t = [
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0.707,
      0.707,
      0,
      -0.707,
      -0.707,
      0,
      0.707
    ];
    this.geometry.setAttribute(
      "position",
      new u(t, 3)
    ), this.material = m(), this.geometry.boundingSphere;
    const i = new b().copy(e.color).multiplyScalar(e.intensity), s = new Z(
      new G(e.distance, 0),
      new L({
        color: i,
        wireframe: !0
      })
    );
    s.raycast = () => {
    }, s.matrixAutoUpdate = !1, this.shape = s, this.target = e, this.sphere = new V(new y(0, 0, 0), 1), this.cacheColor = e.color.getHex(), this.cacheDistance = e.distance, this.cacheVector3 = new y(), this.add(this.shape), this.matrixAutoUpdate = !1, this.matrix = e.matrix, this.matrixWorldNeedsUpdate = !1, this.matrixWorld = e.matrixWorld, this.onBeforeRender = () => {
      const r = this.target, a = this.shape;
      r.distance !== this.cacheDistance && (a.geometry.dispose(), a.geometry = new G(r.distance, 0), this.cacheDistance = r.distance), r.color.getHex() !== this.cacheColor && (a.material.color.copy(r.color).multiplyScalar(r.intensity), this.cacheColor = r.color.getHex());
    };
  }
  raycast(e, t) {
    const i = this.target, s = i.matrixWorld, r = this.sphere;
    r.set(this.cacheVector3.set(0, 0, 0), 1), r.applyMatrix4(s), e.ray.intersectsSphere(r) && t.push({
      distance: e.ray.origin.distanceTo(i.position),
      object: i,
      point: i.position
    });
  }
  dispose() {
    this.shape.geometry.dispose(), this.shape.material.dispose(), this.geometry.dispose(), this.material.dispose();
  }
}
class re extends c {
  constructor(e) {
    super(), this.type = "VisRectAreaLightHelper", this.cacheBox = new C(), this.cacheVector3 = new y(), this.target = e, this.generateShape();
    const t = m();
    t.color.copy(e.color).multiplyScalar(e.intensity), this.cacheColor = e.color.getHex(), this.cacheIntensity = e.intensity, this.material = t, this.matrixAutoUpdate = !1, this.matrix = e.matrix, this.matrixWorldNeedsUpdate = !1, this.matrixWorld = e.matrixWorld, this.onBeforeRender = () => {
      const i = this.target;
      (i.width !== this.geometry.parameters.width || i.height !== this.geometry.parameters.height) && this.generateShape(), (i.color.getHex() !== this.cacheColor || this.cacheIntensity !== i.intensity) && (this.material.color.copy(i.color).multiplyScalar(i.intensity), this.cacheColor = i.color.getHex());
    };
  }
  generateShape() {
    this.geometry.dispose(), this.geometry = new d(
      this.target.width,
      this.target.height,
      4,
      4
    ), this.geometry.computeBoundingBox();
  }
  raycast(e, t) {
    const i = this.target, s = this.cacheBox;
    s.copy(this.geometry.boundingBox), s.applyMatrix4(i.matrixWorld), e.ray.intersectBox(s, this.cacheVector3) && t.push({
      distance: e.ray.origin.distanceTo(i.position),
      object: i,
      point: i.position
    });
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
class ae extends c {
  //TODO: 手动更新api，自动更新api，support更新
  constructor(e) {
    super(), this.type = "VisSpotLightHelper", this.geometry = new p();
    const t = [
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      0,
      1,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0,
      -0.707,
      -0.707,
      0,
      0.707,
      0.707,
      0,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      -0.707,
      0,
      -0.707,
      0.707,
      0,
      0.707,
      0.707,
      0,
      -0.707,
      -0.707,
      0,
      0.707
    ];
    this.geometry.setAttribute(
      "position",
      new u(t, 3)
    ), this.material = m(), this.geometry.boundingSphere;
    const i = new p(), s = [
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      -1,
      1
    ];
    for (let h = 0, g = 1, x = 32; h < x; h++, g++) {
      const w = h / x * Math.PI * 2, F = g / x * Math.PI * 2;
      s.push(
        Math.cos(w),
        Math.sin(w),
        1,
        Math.cos(F),
        Math.sin(F),
        1
      );
    }
    i.setAttribute(
      "position",
      new u(s, 3)
    );
    const r = m(), a = new c(i, r);
    a.material.color.copy(e.color).multiplyScalar(e.intensity);
    const n = e.distance ? e.distance : 1e3, f = n * Math.tan(e.angle);
    a.scale.set(f, f, n), a.raycast = () => {
    }, this.add(a), this.matrixAutoUpdate = !1, this.matrix = e.matrix, this.matrixWorldNeedsUpdate = !1, this.matrixWorld = e.matrixWorld, this.target = e, this.shape = a, this.sphere = new V(new y(0, 0, 0), 1), this.cacheColor = e.color.getHex(), this.cacheDistance = e.distance, this.cacheAngle = e.angle, this.cacheVector3 = new y(), this.onBeforeRender = () => {
      const h = this.target, g = this.shape;
      let x = !1;
      if (h.distance !== this.cacheDistance && (this.cacheDistance = h.distance, g.scale.z = h.distance, x = !0), h.angle !== this.cacheAngle && (this.cacheAngle = h.angle, x = !0), x) {
        const w = h.distance * Math.tan(h.angle);
        g.scale.set(w, w, h.distance);
      }
      h.color.getHex() !== this.cacheColor && (g.material.color.copy(h.color).multiplyScalar(h.intensity), this.cacheColor = h.color.getHex()), g.lookAt(h.target.position);
    };
  }
  raycast(e, t) {
    const i = this.target, s = i.matrixWorld, r = this.sphere;
    r.set(this.cacheVector3.set(0, 0, 0), 1), r.applyMatrix4(s), e.ray.intersectsSphere(r) && t.push({
      distance: e.ray.origin.distanceTo(i.position),
      object: i,
      point: i.position
    });
  }
  dispose() {
    this.shape.geometry.dispose(), this.shape.material.dispose(), this.geometry.dispose(), this.material.dispose();
  }
}
const M = class M extends R {
  constructor(e) {
    super(), this.type = "GeometricOriginHelper", this.target = e, this.geometry = new p().setAttribute(
      "position",
      new U(new Float32Array([0, 0, 0]), 3)
    ), this.material = new v({
      map: M.colorTexture,
      transparent: !0,
      alphaTest: 0.1,
      depthFunc: $,
      size: 10,
      sizeAttenuation: !1
    }), this.matrixAutoUpdate = !1, this.matrixWorldNeedsUpdate = !1, this.matrix = e.matrix, this.matrixWorld = e.matrixWorld, this.renderOrder = 100, this.raycast = () => {
    };
  }
  dispose() {
  }
};
M.colorTexture = new H(
  new W({ width: 32, height: 32 }).draw((e) => {
    e.beginPath(), e.fillStyle = "rgba(0, 0, 0, 0)", e.fillRect(0, 0, 32, 32), e.closePath(), e.beginPath(), e.fillStyle = "rgb(255, 163, 0)", e.strokeStyle = "black", e.lineWidth = 1, e.arc(16, 16, 15, 0, 2 * Math.PI), e.stroke(), e.fill(), e.closePath();
  }).get()
);
let D = M;
class ne extends c {
  constructor(e) {
    const t = new Uint16Array([
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      4,
      0,
      4,
      1,
      5,
      2,
      6,
      3,
      7
    ]), i = new Float32Array(8 * 3), s = new p();
    s.setIndex(new U(t, 1)), s.setAttribute("position", new U(i, 3)), super(
      s,
      new A({ color: 15662848, toneMapped: !1 })
    ), this.type = "BoundingBoxHelper", this.cacheBox = new C(), this.compareBox = new C(), this.matrixAutoUpdate = !1, this.raycast = () => {
    }, this.target = e, this.onBeforeRender = () => {
      this.update();
    };
  }
  update() {
    if (this.cacheBox.setFromObject(this.target), this.cacheBox.isEmpty() || this.cacheBox.equals(this.compareBox)) return;
    this.compareBox.copy(this.cacheBox);
    const e = this.cacheBox.min, t = this.cacheBox.max, i = this.geometry.attributes.position, s = i.array;
    s[0] = t.x, s[1] = t.y, s[2] = t.z, s[3] = e.x, s[4] = t.y, s[5] = t.z, s[6] = e.x, s[7] = e.y, s[8] = t.z, s[9] = t.x, s[10] = e.y, s[11] = t.z, s[12] = t.x, s[13] = t.y, s[14] = e.z, s[15] = e.x, s[16] = t.y, s[17] = e.z, s[18] = e.x, s[19] = e.y, s[20] = e.z, s[21] = t.x, s[22] = e.y, s[23] = e.z, i.needsUpdate = !0, this.geometry.computeBoundingSphere();
  }
  dispose() {
  }
}
class he extends c {
  constructor(e) {
    let t = 5;
    if (e.geometry) {
      const n = e.geometry;
      !n.boundingSphere && n.computeBoundingSphere(), t = n.boundingSphere.radius * 0.8;
    }
    const i = [
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      0,
      0,
      t
    ], s = [
      // prittier-ignore
      1,
      0,
      0,
      1,
      0.6,
      0,
      // prittier-ignore
      0,
      1,
      0,
      0.6,
      1,
      0,
      // prittier-ignore
      0,
      0,
      1,
      0,
      0.6,
      1
    ], r = new p();
    r.setAttribute("position", new u(i, 3)), r.setAttribute("color", new u(s, 3));
    const a = new A({
      vertexColors: !0,
      toneMapped: !1,
      depthFunc: $
    });
    super(r, a), this.target = e, this.matrixAutoUpdate = !1, this.matrixWorldNeedsUpdate = !1, this.matrix = e.matrix, this.matrixWorld = e.matrixWorld, this.renderOrder = 100, this.raycast = () => {
    };
  }
  dispose() {
  }
}
const ce = `

#include <common>

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

  bool isPerspective = isPerspectiveMatrix( projectionMatrix );

  if ( isPerspective ) scale *= - mvPosition.z;

	vec2 alignedPosition = position.xy * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( 0.0 ) * alignedPosition.x - sin( 0.0 ) * alignedPosition.y;
	rotatedPosition.y = sin( 0.0 ) * alignedPosition.x + cos( 0.0 ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`, le = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;
let pe = class extends T {
  constructor() {
    super(), this.vertexShader = ce, this.fragmentShader = le, this.uniforms = {
      color: { value: new b("white") }
    };
  }
};
class de extends c {
  constructor(e) {
    super(), this.type = "VisCSS2DPlaneHelper", this.geometry = new l(new d(1, 1)), this.geometry.computeBoundingBox(), this.material = new pe(), this.scale.copy(e.matrixScale), this.position.set(e.position.x, e.position.y, e.position.z), this.target = e;
    const t = new MutationObserver(() => {
      this.scale.copy(e.matrixScale);
    });
    t.observe(e.element, {
      attributeFilter: ["style"]
    }), this.observer = t, this.onBeforeRender = () => {
      this.position.set(
        this.target.position.x,
        this.target.position.y,
        this.target.position.z
      );
    }, this.raycast = () => {
    };
  }
  dispose() {
    this.observer.disconnect();
  }
}
class me extends c {
  constructor(e) {
    super(), this.type = "VisCSS3DPlaneHelper", this.geometry = new l(
      new d(e.width, e.height)
    ), this.geometry.computeBoundingBox(), this.material = m(), this.matrixAutoUpdate = !1, this.matrix = e.matrix, this.matrixWorldNeedsUpdate = !1, this.matrixWorld = e.matrixWorld, this.target = e;
    const t = new MutationObserver(() => {
      this.geometry.dispose(), this.geometry = new l(
        new d(e.width, e.height)
      ), this.geometry.computeBoundingBox();
    });
    t.observe(e.element, {
      attributeFilter: ["style"]
    }), this.observer = t, this.raycast = () => {
    }, this.updateMatrixWorld = () => {
    };
  }
  dispose() {
    this.observer.disconnect();
  }
}
const ge = `
uniform float rotation2D;

#include <common>

void main() {
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	vec2 alignedPosition = position.xy * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation2D ) * alignedPosition.x - sin( rotation2D ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation2D ) * alignedPosition.x + cos( rotation2D ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`, xe = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;
class ue extends T {
  constructor() {
    super(), this.vertexShader = ge, this.fragmentShader = xe, this.uniforms = {
      color: { value: new b("white") },
      rotation2D: { value: 0 }
    };
  }
}
class ye extends c {
  constructor(e) {
    super(), this.type = "VisCSS3DSpriteHelper", this.geometry = new l(new d(1, 1)), this.geometry.computeBoundingBox(), this.material = new ue(), this.matrixAutoUpdate = !1, this.matrix = e.matrix, this.matrixWorldNeedsUpdate = !1, this.matrixWorld = e.matrixWorld, this.target = e;
    const t = new MutationObserver(() => {
      this.geometry.dispose(), this.geometry = new l(
        new d(e.width, e.height)
      ), this.geometry.computeBoundingBox();
    });
    t.observe(e.element, {
      attributeFilter: ["style"]
    }), this.observer = t, this.onBeforeRender = () => {
      this.material.uniforms.rotation2D.value = // @ts-ignore
      this.target.rotation2D;
    }, this.raycast = () => {
    }, this.updateMatrixWorld = () => {
    };
  }
  dispose() {
    this.observer.disconnect();
  }
}
const P = class P extends ee {
  constructor(e) {
    super(), this.type = "VisGroupHelper", this.target = e, this.geometry.computeBoundingBox(), this.material = new te({
      map: P.colorTexture
    }), this.material.depthTest = !1, this.material.depthWrite = !1, this.scale.set(5, 5, 5);
    const t = this.updateMatrixWorld.bind(this);
    this.updateMatrixWorld = (i) => {
      const s = this.position, r = this.target.position;
      s.x = r.x, s.y = r.y, s.z = r.z, t(i);
    };
  }
  raycast(e, t) {
    const i = this.matrixWorld, s = this.geometry.boundingBox.clone();
    if (s.applyMatrix4(i), e.ray.intersectsBox(s)) {
      const r = this.target;
      t.push({
        distance: e.ray.origin.distanceTo(r.position),
        object: r,
        point: r.position
      });
    }
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
};
P.colorTexture = new H(
  new W({ width: 512, height: 512 }).draw((e) => {
    e.beginPath(), e.fillStyle = "rgba(0, 0, 0, 0)", e.fillRect(0, 0, 512, 512), e.closePath(), e.translate(256, 200), e.beginPath(), e.fillStyle = "yellow", e.fillRect(-200, 0, 400, 200), e.closePath(), e.beginPath(), e.fillStyle = "yellow", e.fillRect(-200, -70, 200, 70), e.closePath();
  }).get()
);
let O = P;
const S = class S extends R {
  constructor(e) {
    super(), this.type = "VisLineHelper", this.target = e, this.geometry.dispose(), this.geometry.copy(e.geometry), this.cachaGeometryUUid = e.geometry.uuid, this.material = new v({
      color: "rgb(255, 255, 255)",
      alphaMap: S.alphaTexture,
      transparent: !0,
      size: 5,
      sizeAttenuation: !1
    }), this.matrixAutoUpdate = !1, this.matrixWorldNeedsUpdate = !1, this.matrix = e.matrix, this.matrixWorld = e.matrixWorld, this.renderOrder = -1, this.raycast = () => {
    }, this.onBeforeRender = () => {
      const t = this.target;
      t.geometry.uuid !== this.cachaGeometryUUid && (this.geometry.dispose(), this.geometry = t.geometry.clone(), this.cachaGeometryUUid = t.geometry.uuid);
    };
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
};
S.alphaTexture = new H(
  new W({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((e) => {
    e.beginPath(), e.fillStyle = "rgb(255, 255, 255)", e.arc(256, 256, 200, 0, Math.PI * 2), e.fill(), e.closePath();
  }).getDom()
);
let j = S;
class fe extends c {
  // 存uuid防止内存泄漏
  constructor(e) {
    super(), this.type = "VisMeshHelper";
    const t = 1;
    this.target = e, this.geometry = new l(e.geometry, t), this.cachaGeometryUUid = e.geometry.uuid, this.material = m(), this.matrixAutoUpdate = !1, this.matrixWorldNeedsUpdate = !1, this.matrix = e.matrix, this.matrixWorld = e.matrixWorld, this.updateMatrixWorld = () => {
    }, this.raycast = () => {
    }, this.onBeforeRender = () => {
      const i = this.target;
      i.geometry.uuid !== this.cachaGeometryUUid && (this.geometry.dispose(), this.geometry = new l(i.geometry, t), this.cachaGeometryUUid = i.geometry.uuid);
    };
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const B = class B extends R {
  constructor(e) {
    super(), this.type = "VisPointsHelper", this.target = e, this.geometry.dispose(), this.geometry.copy(e.geometry), this.material.dispose(), this.material = new v({
      color: "rgb(255, 255, 255)",
      alphaMap: B.alphaTexture,
      transparent: !0
    });
    const t = Array.isArray(e.material) ? e.material[0] : e.material;
    t instanceof v && (this.material.size = t.size, this.material.sizeAttenuation = t.sizeAttenuation), this.matrixAutoUpdate = !1, this.matrixWorldNeedsUpdate = !1, this.matrix = e.matrix, this.matrixWorld = e.matrixWorld, this.raycast = () => {
    };
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
};
B.alphaTexture = new H(
  new W({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((e) => {
    e.beginPath(), e.strokeStyle = "rgb(255, 255, 255)", e.lineWidth = 4, e.strokeRect(0, 0, 512, 512), e.closePath();
  }).get()
);
let z = B;
const we = `

uniform float rotation;
uniform vec2 center;
uniform bool sizeAttenuation;

#include <common>

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );

	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );

	if (!sizeAttenuation) {
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;
  }

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

}

`, be = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;
class ve extends T {
  constructor() {
    super(), this.vertexShader = we, this.fragmentShader = be, this.uniforms = {
      color: { value: new b("white") },
      center: {
        value: new ie(0.5, 0.5)
      },
      rotation: {
        value: 0
      },
      sizeAttenuation: {
        value: !1
      }
    };
  }
}
class Me extends c {
  constructor(e) {
    super(), this.type = "VisSpriteHelper", this.geometry = new l(new d(1, 1)), this.geometry.computeBoundingBox(), this.material = new ve(), this.matrixAutoUpdate = !1, this.matrixWorldNeedsUpdate = !1, this.matrix = e.matrix, this.matrixWorld = e.matrixWorld, this.target = e, this.onBeforeRender = () => {
      this.material.uniforms.rotation.value = this.target.material.rotation, this.material.uniforms.sizeAttenuation.value = this.target.material.sizeAttenuation;
    }, this.raycast = () => {
    };
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose();
  }
}
const Pe = function() {
  return Object.assign(I(), {});
}, Se = function() {
  return Object.assign(Pe(), {
    target: "",
    shape: !0,
    boundingBox: !1,
    geometricOrigin: !1,
    localAxes: !1
  });
};
class Be extends q {
  constructor() {
    super(), this.shapeMap = {
      PointLight: oe,
      SpotLight: ae,
      DirectionalLight: se,
      RectAreaLight: re,
      PerspectiveCamera: N,
      OrthographicCamera: N,
      Mesh: fe,
      Group: O,
      Sprite: Me,
      Points: z,
      Line: j,
      CSS3DPlane: me,
      CSS3DSprite: ye,
      CSS2DPlane: de
    };
  }
  generateShape() {
    if (this.target) {
      if (!this.shapeMap[this.target.type]) {
        console.warn(`object helper can not support ${this.target.type}`);
        return;
      }
      const e = new this.shapeMap[this.target.type](this.target);
      this.shape = e;
    }
  }
  generateBoundingBox() {
    if (this.target) {
      const e = new ne(this.target);
      this.boundingBox = e;
    }
  }
  generateGeometricOrigin() {
    if (this.target) {
      const e = new D(this.target);
      this.geometricOrigin = e;
    }
  }
  generateLocalAxes() {
    if (this.target) {
      const e = new he(this.target);
      this.localAxes = e;
    }
  }
  dispose(e) {
    if (e && this[e]) {
      this[e].removeFromParent(), this[e].dispose(), this[e] = void 0;
      return;
    }
    this.target = void 0, ["shape", "boundingBox", "geometricOrigin", "localAxes"].forEach((t) => {
      this[t] && (this[t].removeFromParent(), this[t].dispose(), this[t] = void 0);
    });
  }
}
const Ae = _({
  type: "ObjectHelper",
  config: Se,
  context() {
    return {
      helperEventMap: {}
    };
  },
  shared: {
    addHelper(o, e, t, i) {
      const s = {
        shape: e.generateShape,
        boundingBox: e.generateBoundingBox,
        geometricOrigin: e.generateGeometricOrigin,
        localAxes: e.generateLocalAxes
      };
      if (!s[o]) {
        console.warn(
          `Object helper Model: can not found helper: ${o} in generator.`
        );
        return;
      }
      const r = s[o]();
      i.toAsync((a) => {
        var h;
        const n = i.toObject(t.target);
        if (!n || !n.parent)
          return a && console.warn(
            `object helper model can not fund object parent: ${n}`
          ), !1;
        n.parent.add(r);
        const f = () => {
          n.parent.add(r);
        };
        return (h = i.toModel(t.target)) == null || h.on(`${E.COMPILED_ATTR}:parent`, f), i.helperEventMap[o] = f, !0;
      });
    },
    removeHelper(o, e, t, i) {
      var a;
      if (!i.toObject(t.target)) {
        console.warn(
          `object helper model: can not fund object: ${t.target}`
        );
        return;
      }
      const r = i.helperEventMap[o];
      r && ((a = i.toModel(t.target)) == null || a.off(`${E.COMPILED_ATTR}:parent`, r)), e.dispose(o);
    }
  },
  commands: {
    set: {
      shape({ model: o, config: e, target: t, value: i, engine: s }) {
        i && !t.shape ? o.addHelper("shape", t, e, o) : !i && t.shape && o.removeHelper("shape", t, e, o);
      },
      boundingBox({ model: o, config: e, target: t, value: i, engine: s }) {
        i && !t.boundingBox ? o.addHelper("boundingBox", t, e, o) : !i && t.boundingBox && o.removeHelper("boundingBox", t, e, o);
      },
      geometricOrigin({ model: o, config: e, target: t, value: i, engine: s }) {
        i && !t.geometricOrigin ? o.addHelper("geometricOrigin", t, e, o) : !i && t.geometricOrigin && o.removeHelper("geometricOrigin", t, e, o);
      },
      localAxes({ model: o, config: e, target: t, value: i, engine: s }) {
        i && !t.localAxes ? o.addHelper("localAxes", t, e, o) : !i && t.localAxes && o.removeHelper("localAxes", t, e, o);
      }
    }
  },
  create({ model: o, config: e, engine: t }) {
    const i = new Be();
    if (e.target) {
      const s = t.getObjectBySymbol(e.target), r = t.getConfigBySymbol(e.target);
      r.helper = e.vid, s ? (i.target = s, e.shape && o.addHelper("shape", i, e, o), e.boundingBox && o.addHelper("boundingBox", i, e, o), e.geometricOrigin && o.addHelper("geometricOrigin", i, e, o), e.localAxes && o.addHelper("localAxes", i, e, o)) : console.warn(
        `object helper processor can not found target in engine ${e.target}`
      );
    }
    return i;
  },
  dispose({ target: o }) {
    o.dispose();
  },
  expand: [
    {
      models: new RegExp("Mesh|Light|Line|Points|Group|Object3D"),
      config: () => ({
        helper: ""
      }),
      commands: {
        add: {
          helper() {
          }
        },
        set: {
          helper() {
          }
        }
      }
    }
  ]
}), Oe = k({
  type: "helper",
  models: [Ae],
  lifeOrder: Y.FOUR
});
export {
  ne as BoundingBoxHelper,
  de as CSS2DPlaneHelper,
  me as CSS3DPlaneHelper,
  ye as CSS3DSpriteHelper,
  N as CameraHelper,
  se as DirectionalLightHelper,
  D as GeometricOriginHelper,
  O as GroupHelper,
  j as LineHelper,
  he as LocalAxesHelper,
  fe as MeshHelper,
  oe as PointLightHelper,
  z as PointsHelper,
  re as RectAreaLightHelper,
  ae as SpotLightHelper,
  Me as SpriteHelper,
  Oe as default,
  Pe as getHelperConfig,
  Se as getObjectHelperConfig
};
