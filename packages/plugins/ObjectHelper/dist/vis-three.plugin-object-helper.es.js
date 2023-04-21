var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { EventDispatcher, ENGINE_EVENT } from "@vis-three/core";
import { LineBasicMaterial, LineSegments, BufferGeometry, Float32BufferAttribute, CameraHelper as CameraHelper$1, Matrix4, PerspectiveCamera, OrthographicCamera, Color, PlaneBufferGeometry, EdgesGeometry, Sphere, Vector3, Mesh, OctahedronBufferGeometry, MeshBasicMaterial, Box3, Points, CanvasTexture, BufferAttribute, PointsMaterial, AlwaysDepth, ShaderMaterial, Sprite, SpriteMaterial, Vector2, Material, Scene } from "three";
import { CanvasGenerator } from "@vis-three/convenient";
import { transPkgName } from "@vis-three/utils";
const getHelperLineMaterial = () => new LineBasicMaterial({ color: "rgb(255, 255, 255)" });
class CameraHelper extends LineSegments {
  constructor(camera) {
    super();
    __publicField(this, "shape");
    __publicField(this, "target");
    __publicField(this, "type", "CameraHelper");
    __publicField(this, "cachaData");
    const geometry = new BufferGeometry();
    const positions = [
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
    geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
    geometry.rotateY(-90 * Math.PI / 180);
    geometry.computeBoundingBox();
    const shape = new CameraHelper$1(camera);
    shape.matrix = new Matrix4();
    shape.matrixAutoUpdate = true;
    shape.raycast = () => {
    };
    this.add(shape);
    this.shape = shape;
    this.geometry = geometry;
    this.material = getHelperLineMaterial();
    this.target = camera;
    this.matrixAutoUpdate = false;
    this.matrix = camera.matrix;
    if (camera instanceof PerspectiveCamera) {
      this.cachaData = {
        fov: camera.fov,
        aspect: camera.aspect,
        near: camera.near,
        far: camera.far
      };
    } else if (camera instanceof OrthographicCamera) {
      this.cachaData = {
        left: camera.left,
        right: camera.right,
        top: camera.top,
        bottom: camera.bottom,
        near: camera.near,
        far: camera.far
      };
    } else {
      this.cachaData = {};
    }
    this.onBeforeRender = () => {
      let needsUpdate = false;
      const cachaData = this.cachaData;
      Object.keys(cachaData).forEach((key) => {
        if (cachaData[key] !== camera[key]) {
          cachaData[key] = camera[key];
          needsUpdate = true;
        }
      });
      needsUpdate && this.shape.update();
    };
  }
  raycast(raycaster, intersects) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox.clone();
    box.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target;
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class DirectionalLightHelper extends LineSegments {
  constructor(directionalLight) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisDirectionalLightHelper");
    __publicField(this, "cacheColor");
    __publicField(this, "cacheVector3");
    this.geometry = new BufferGeometry();
    const points = [
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
      new Float32BufferAttribute(points, 3)
    );
    this.material = getHelperLineMaterial();
    this.geometry.boundingSphere;
    const color = new Color().copy(directionalLight.color).multiplyScalar(directionalLight.intensity);
    const planeGemetry = new PlaneBufferGeometry(20, 20);
    planeGemetry.dispose();
    const shape = new LineSegments(
      new EdgesGeometry(planeGemetry),
      new LineBasicMaterial({
        color
      })
    );
    shape.raycast = () => {
    };
    this.shape = shape;
    this.target = directionalLight;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = directionalLight.color.getHex();
    this.cacheVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = directionalLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = directionalLight.matrixWorld;
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      if (light.color.getHex() !== this.cacheColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }
      shape2.lookAt(light.target.position);
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class PointLightHelper extends LineSegments {
  constructor(pointLight) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisPointLightHelper");
    __publicField(this, "cacheColor");
    __publicField(this, "cacheDistance");
    __publicField(this, "cacheVector3");
    this.geometry = new BufferGeometry();
    const points = [
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
      new Float32BufferAttribute(points, 3)
    );
    this.material = getHelperLineMaterial();
    this.geometry.boundingSphere;
    const color = new Color().copy(pointLight.color).multiplyScalar(pointLight.intensity);
    const shape = new Mesh(
      new OctahedronBufferGeometry(pointLight.distance, 0),
      new MeshBasicMaterial({
        color,
        wireframe: true
      })
    );
    shape.raycast = () => {
    };
    shape.matrixAutoUpdate = false;
    this.shape = shape;
    this.target = pointLight;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = pointLight.color.getHex();
    this.cacheDistance = pointLight.distance;
    this.cacheVector3 = new Vector3();
    this.add(this.shape);
    this.matrixAutoUpdate = false;
    this.matrix = pointLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = pointLight.matrixWorld;
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      if (light.distance !== this.cacheDistance) {
        shape2.geometry.dispose();
        shape2.geometry = new OctahedronBufferGeometry(light.distance, 0);
        this.cacheDistance = light.distance;
      }
      if (light.color.getHex() !== this.cacheColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class RectAreaLightHelper extends LineSegments {
  constructor(rectAreaLight) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisRectAreaLightHelper");
    __publicField(this, "cacheBox", new Box3());
    __publicField(this, "cacheVector3", new Vector3());
    __publicField(this, "cacheColor");
    __publicField(this, "cacheIntensity");
    this.target = rectAreaLight;
    this.generateShape();
    const material = getHelperLineMaterial();
    material.color.copy(rectAreaLight.color).multiplyScalar(rectAreaLight.intensity);
    this.cacheColor = rectAreaLight.color.getHex();
    this.cacheIntensity = rectAreaLight.intensity;
    this.material = material;
    this.matrixAutoUpdate = false;
    this.matrix = rectAreaLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = rectAreaLight.matrixWorld;
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.width !== this.geometry.parameters.width || target.height !== this.geometry.parameters.height) {
        this.generateShape();
      }
      if (target.color.getHex() !== this.cacheColor || this.cacheIntensity !== target.intensity) {
        this.material.color.copy(target.color).multiplyScalar(target.intensity);
        this.cacheColor = target.color.getHex();
      }
    };
  }
  generateShape() {
    this.geometry.dispose();
    this.geometry = new PlaneBufferGeometry(
      this.target.width,
      this.target.height,
      4,
      4
    );
    this.geometry.computeBoundingBox();
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const box = this.cacheBox;
    box.copy(this.geometry.boundingBox);
    box.applyMatrix4(target.matrixWorld);
    if (raycaster.ray.intersectBox(box, this.cacheVector3)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
class SpotLightHelper extends LineSegments {
  constructor(spotLight) {
    super();
    __publicField(this, "sphere");
    __publicField(this, "target");
    __publicField(this, "shape");
    __publicField(this, "type", "VisSpotLightHelper");
    __publicField(this, "cacheVector3");
    __publicField(this, "cacheColor");
    __publicField(this, "cacheAngle");
    __publicField(this, "cacheDistance");
    this.geometry = new BufferGeometry();
    const points = [
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
      new Float32BufferAttribute(points, 3)
    );
    this.material = getHelperLineMaterial();
    this.geometry.boundingSphere;
    const shapeGeometry = new BufferGeometry();
    const positions = [
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
    for (let i = 0, j = 1, l = 32; i < l; i++, j++) {
      const p1 = i / l * Math.PI * 2;
      const p2 = j / l * Math.PI * 2;
      positions.push(
        Math.cos(p1),
        Math.sin(p1),
        1,
        Math.cos(p2),
        Math.sin(p2),
        1
      );
    }
    shapeGeometry.setAttribute(
      "position",
      new Float32BufferAttribute(positions, 3)
    );
    const material = getHelperLineMaterial();
    const shape = new LineSegments(shapeGeometry, material);
    shape.material.color.copy(spotLight.color).multiplyScalar(spotLight.intensity);
    const coneLength = spotLight.distance ? spotLight.distance : 1e3;
    const coneWidth = coneLength * Math.tan(spotLight.angle);
    shape.scale.set(coneWidth, coneWidth, coneLength);
    shape.raycast = () => {
    };
    this.add(shape);
    this.matrixAutoUpdate = false;
    this.matrix = spotLight.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = spotLight.matrixWorld;
    this.target = spotLight;
    this.shape = shape;
    this.sphere = new Sphere(new Vector3(0, 0, 0), 1);
    this.cacheColor = spotLight.color.getHex();
    this.cacheDistance = spotLight.distance;
    this.cacheAngle = spotLight.angle;
    this.cacheVector3 = new Vector3();
    this.onBeforeRender = () => {
      const light = this.target;
      const shape2 = this.shape;
      let shapeUpdate = false;
      if (light.distance !== this.cacheDistance) {
        this.cacheDistance = light.distance;
        shape2.scale.z = light.distance;
        shapeUpdate = true;
      }
      if (light.angle !== this.cacheAngle) {
        this.cacheAngle = light.angle;
        shapeUpdate = true;
      }
      if (shapeUpdate) {
        const range = light.distance * Math.tan(light.angle);
        shape2.scale.set(range, range, light.distance);
      }
      if (light.color.getHex() !== this.cacheColor) {
        shape2.material.color.copy(light.color).multiplyScalar(light.intensity);
        this.cacheColor = light.color.getHex();
      }
      shape2.lookAt(light.target.position);
    };
  }
  raycast(raycaster, intersects) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const sphere = this.sphere;
    sphere.set(this.cacheVector3.set(0, 0, 0), 1);
    sphere.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsSphere(sphere)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
}
const _GeometricOriginHelper = class extends Points {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "GeometricOriginHelper");
    this.target = target;
    this.geometry = new BufferGeometry().setAttribute(
      "position",
      new BufferAttribute(new Float32Array([0, 0, 0]), 3)
    );
    this.material = new PointsMaterial({
      map: _GeometricOriginHelper.colorTexture,
      transparent: true,
      alphaTest: 0.1,
      depthFunc: AlwaysDepth
    });
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorld = target.matrixWorld;
    this.renderOrder = 100;
    this.raycast = () => {
    };
  }
};
let GeometricOriginHelper = _GeometricOriginHelper;
__publicField(GeometricOriginHelper, "colorTexture", new CanvasTexture(
  new CanvasGenerator({ width: 32, height: 32 }).draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 32, 32);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 163, 0)";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.arc(16, 16, 15, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }).get()
));
const vertex$2 = `

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

`;
const fragment$2 = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;
class CSS2DHelperMaterial$1 extends ShaderMaterial {
  constructor() {
    super();
    this.vertexShader = vertex$2;
    this.fragmentShader = fragment$2;
    this.uniforms = {
      color: { value: new Color("white") }
    };
  }
}
class CSS2DPlaneHelper extends LineSegments {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisCSS2DPlaneHelper");
    __publicField(this, "observer");
    this.geometry = new EdgesGeometry(new PlaneBufferGeometry(1, 1));
    this.geometry.computeBoundingBox();
    this.material = new CSS2DHelperMaterial$1();
    this.scale.copy(target.matrixScale);
    this.position.set(target.position.x, target.position.y, target.position.z);
    this.target = target;
    const observer = new MutationObserver(() => {
      this.scale.copy(target.matrixScale);
    });
    observer.observe(target.element, {
      attributeFilter: ["style"]
    });
    this.observer = observer;
    this.onBeforeRender = () => {
      this.position.set(
        this.target.position.x,
        this.target.position.y,
        this.target.position.z
      );
    };
    this.raycast = () => {
    };
  }
  dispose() {
    this.observer.disconnect();
  }
}
class CSS3DPlaneHelper extends LineSegments {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisCSS3DPlaneHelper");
    __publicField(this, "observer");
    this.geometry = new EdgesGeometry(
      new PlaneBufferGeometry(target.width, target.height)
    );
    this.geometry.computeBoundingBox();
    this.material = getHelperLineMaterial();
    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;
    this.target = target;
    const observer = new MutationObserver(() => {
      this.geometry.dispose();
      this.geometry = new EdgesGeometry(
        new PlaneBufferGeometry(target.width, target.height)
      );
      this.geometry.computeBoundingBox();
    });
    observer.observe(target.element, {
      attributeFilter: ["style"]
    });
    this.observer = observer;
    this.raycast = () => {
    };
    this.updateMatrixWorld = () => {
    };
  }
  dispose() {
    this.observer.disconnect();
  }
}
const vertex$1 = `
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

`;
const fragment$1 = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;
class CSS3DSpriteHelperMaterial extends ShaderMaterial {
  constructor() {
    super();
    this.vertexShader = vertex$1;
    this.fragmentShader = fragment$1;
    this.uniforms = {
      color: { value: new Color("white") },
      rotation2D: { value: 0 }
    };
  }
}
class CSS3DSpriteHelper extends LineSegments {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisCSS3DSpriteHelper");
    __publicField(this, "observer");
    this.geometry = new EdgesGeometry(new PlaneBufferGeometry(1, 1));
    this.geometry.computeBoundingBox();
    this.material = new CSS3DSpriteHelperMaterial();
    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;
    this.target = target;
    const observer = new MutationObserver(() => {
      this.geometry.dispose();
      this.geometry = new EdgesGeometry(
        new PlaneBufferGeometry(target.width, target.height)
      );
      this.geometry.computeBoundingBox();
    });
    observer.observe(target.element, {
      attributeFilter: ["style"]
    });
    this.observer = observer;
    this.onBeforeRender = () => {
      this.material.uniforms.rotation2D.value = this.target.rotation2D;
    };
    this.raycast = () => {
    };
    this.updateMatrixWorld = () => {
    };
  }
  dispose() {
    this.observer.disconnect();
  }
}
const _GroupHelper = class extends Sprite {
  constructor(group) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisGroupHelper");
    this.target = group;
    this.geometry.computeBoundingBox();
    this.material = new SpriteMaterial({
      map: _GroupHelper.colorTexture
    });
    this.material.depthTest = false;
    this.material.depthWrite = false;
    this.scale.set(5, 5, 5);
    const updateMatrixWorldFun = this.updateMatrixWorld.bind(this);
    this.updateMatrixWorld = (focus) => {
      const position = this.position;
      const groupPosition = this.target.position;
      position.x = groupPosition.x;
      position.y = groupPosition.y;
      position.z = groupPosition.z;
      updateMatrixWorldFun(focus);
    };
  }
  raycast(raycaster, intersects) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox.clone();
    box.applyMatrix4(matrixWorld);
    if (raycaster.ray.intersectsBox(box)) {
      const target = this.target;
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position
      });
    }
  }
};
let GroupHelper = _GroupHelper;
__publicField(GroupHelper, "colorTexture", new CanvasTexture(
  new CanvasGenerator({ width: 512, height: 512 }).draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0)";
    ctx.fillRect(0, 0, 512, 512);
    ctx.closePath();
    ctx.translate(256, 200);
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.fillRect(-200, 0, 400, 200);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.fillRect(-200, -70, 200, 70);
    ctx.closePath();
  }).get()
));
const _LineHelper = class extends Points {
  constructor(line) {
    super();
    __publicField(this, "target");
    __publicField(this, "cachaGeometryUUid");
    __publicField(this, "type", "VisLineHelper");
    this.target = line;
    this.geometry.dispose();
    this.geometry.copy(line.geometry);
    this.cachaGeometryUUid = line.geometry.uuid;
    this.material = new PointsMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: _LineHelper.alphaTexture,
      transparent: true,
      size: 5,
      sizeAttenuation: false
    });
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = line.matrix;
    this.matrixWorld = line.matrixWorld;
    this.renderOrder = -1;
    this.raycast = () => {
    };
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.geometry.uuid !== this.cachaGeometryUUid) {
        this.geometry.dispose();
        this.geometry = target.geometry.clone();
        this.cachaGeometryUUid = target.geometry.uuid;
      }
    };
  }
};
let LineHelper = _LineHelper;
__publicField(LineHelper, "alphaTexture", new CanvasTexture(
  new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((ctx) => {
    ctx.beginPath();
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.arc(256, 256, 200, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }).getDom()
));
class MeshHelper extends LineSegments {
  constructor(mesh) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisMeshHelper");
    __publicField(this, "cachaGeometryUUid");
    const thresholdAngle = 1;
    this.target = mesh;
    this.geometry = new EdgesGeometry(mesh.geometry, thresholdAngle);
    this.cachaGeometryUUid = mesh.geometry.uuid;
    this.material = getHelperLineMaterial();
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = mesh.matrix;
    this.matrixWorld = mesh.matrixWorld;
    this.updateMatrixWorld = () => {
    };
    this.raycast = () => {
    };
    this.onBeforeRender = () => {
      const target = this.target;
      if (target.geometry.uuid !== this.cachaGeometryUUid) {
        this.geometry.dispose();
        this.geometry = new EdgesGeometry(target.geometry, thresholdAngle);
        this.cachaGeometryUUid = target.geometry.uuid;
      }
    };
  }
}
const _PointsHelper = class extends Points {
  constructor(points) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisPointsHelper");
    this.target = points;
    this.geometry.dispose();
    this.geometry.copy(points.geometry);
    this.material.dispose();
    this.material = new PointsMaterial({
      color: "rgb(255, 255, 255)",
      alphaMap: _PointsHelper.alphaTexture,
      transparent: true
    });
    const material = Array.isArray(points.material) ? points.material[0] : points.material;
    if (material instanceof PointsMaterial) {
      this.material.size = material.size;
      this.material.sizeAttenuation = material.sizeAttenuation;
    }
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = points.matrix;
    this.matrixWorld = points.matrixWorld;
    this.raycast = () => {
    };
  }
};
let PointsHelper = _PointsHelper;
__publicField(PointsHelper, "alphaTexture", new CanvasTexture(
  new CanvasGenerator({ width: 512, height: 512, bgColor: "rgb(0, 0, 0)" }).draw((ctx) => {
    ctx.beginPath();
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = 4;
    ctx.strokeRect(0, 0, 512, 512);
    ctx.closePath();
  }).get()
));
const vertex = `

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

`;
const fragment = `

uniform vec3 color;

void main() {
  gl_FragColor = vec4(color, 1.0);
}
`;
class CSS2DHelperMaterial extends ShaderMaterial {
  constructor() {
    super();
    this.vertexShader = vertex;
    this.fragmentShader = fragment;
    this.uniforms = {
      color: { value: new Color("white") },
      center: {
        value: new Vector2(0.5, 0.5)
      },
      rotation: {
        value: 0
      },
      sizeAttenuation: {
        value: false
      }
    };
  }
}
class SpriteHelper extends LineSegments {
  constructor(target) {
    super();
    __publicField(this, "target");
    __publicField(this, "type", "VisSpriteHelper");
    this.geometry = new EdgesGeometry(new PlaneBufferGeometry(1, 1));
    this.geometry.computeBoundingBox();
    this.material = new CSS2DHelperMaterial();
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorld = target.matrixWorld;
    this.target = target;
    this.onBeforeRender = () => {
      this.material.uniforms.rotation.value = this.target.material.rotation;
      this.material.uniforms.sizeAttenuation.value = this.target.material.sizeAttenuation;
    };
    this.raycast = () => {
    };
  }
}
class ObjectHelperManager extends EventDispatcher {
  constructor(params = {}) {
    super();
    __publicField(this, "helperGenerator", {
      PointLight: PointLightHelper,
      SpotLight: SpotLightHelper,
      DirectionalLight: DirectionalLightHelper,
      RectAreaLight: RectAreaLightHelper,
      PerspectiveCamera: CameraHelper,
      OrthographicCamera: CameraHelper,
      Mesh: MeshHelper,
      Group: GroupHelper,
      Sprite: SpriteHelper,
      Points: PointsHelper,
      Line: LineHelper,
      CSS3DPlane: CSS3DPlaneHelper,
      CSS3DSprite: CSS3DSpriteHelper,
      CSS2DPlane: CSS2DPlaneHelper
    });
    __publicField(this, "helperFilter", {
      AmbientLight: true,
      HemisphereLight: true,
      Object3D: true,
      TransformControls: true,
      Scene: true
    });
    __publicField(this, "objectFilter", /* @__PURE__ */ new Set());
    __publicField(this, "objectHelperMap", /* @__PURE__ */ new Map());
    params.helperGenerator && (this.helperGenerator = Object.assign(
      this.helperGenerator,
      params.helperGenerator
    ));
    params.helperFilter && (this.helperFilter = Object.assign(
      this.helperFilter,
      params.helperFilter
    ));
    params.objectFilter && (this.objectFilter = new Set(
      params.objectFilter.concat(Array.from(this.objectFilter))
    ));
  }
  addFilteredObject(...objects) {
    for (const object of objects) {
      this.objectFilter.add(object);
    }
    return this;
  }
  addObjectHelper(object) {
    if (this.objectFilter.has(object) || this.objectHelperMap.has(object) || this.helperFilter[object.type] || object.type.toLocaleLowerCase().includes("helper")) {
      return null;
    }
    if (!this.helperGenerator[object.type]) {
      console.warn(
        `object helper can not support this type object: '${object.type}'`
      );
      return null;
    }
    const helper = new this.helperGenerator[object.type](object);
    this.objectHelperMap.set(object, helper);
    return helper;
  }
  disposeObjectHelper(object) {
    if (this.objectFilter.has(object) || this.helperFilter[object.type] || object.type.toLocaleLowerCase().includes("helper")) {
      return null;
    }
    if (!this.objectHelperMap.has(object)) {
      console.warn(
        `object helper manager can not found this object\`s helper: `,
        object
      );
      return null;
    }
    const helper = this.objectHelperMap.get(object);
    helper.geometry && helper.geometry.dispose();
    if (helper.material) {
      if (helper.material instanceof Material) {
        helper.material.dispose();
      } else {
        helper.material.forEach((material) => {
          material.dispose();
        });
      }
    }
    this.objectHelperMap.delete(object);
    return helper;
  }
  dispose() {
    for (const object of this.objectHelperMap.keys()) {
      this.disposeObjectHelper(object);
    }
    this.objectHelperMap.clear();
  }
}
const name = "@vis-three/plugin-object-helper";
const AFTERADD = "afterAdd";
const AFTERREMOVE = "afterRemove";
Scene.prototype.add = function(...object) {
  if (!arguments.length) {
    return this;
  }
  if (arguments.length > 1) {
    for (let i = 0; i < arguments.length; i++) {
      this.add(arguments[i]);
    }
    return this;
  }
  const currentObject = object[0];
  if (currentObject === this) {
    console.error(
      "THREE.Object3D.add: object can't be added as a child of itself.",
      object
    );
    return this;
  }
  if (currentObject && currentObject.isObject3D) {
    if (currentObject.parent !== null) {
      const index = this.children.indexOf(currentObject);
      if (index !== -1) {
        currentObject.parent = null;
        this.children.splice(index, 1);
        currentObject.dispatchEvent({ type: "removed" });
      }
    }
    currentObject.parent = this;
    this.children.push(currentObject);
    currentObject.dispatchEvent({ type: "added" });
  } else {
    console.error(
      "THREE.Object3D.add: object not an instance of THREE.Object3D.",
      object
    );
  }
  return this;
};
const sceneAdd = Scene.prototype.add;
const sceneRemove = Scene.prototype.remove;
Scene.prototype.add = function(...object) {
  sceneAdd.call(this, ...object);
  this.dispatchEvent({
    type: AFTERADD,
    objects: object
  });
  return this;
};
Scene.prototype.remove = function(...object) {
  sceneRemove.call(this, ...object);
  this.dispatchEvent({
    type: AFTERREMOVE,
    objects: object
  });
  return this;
};
const OBJECT_HELPER_PLUGIN = transPkgName(name);
const ObjectHelperPlugin = function() {
  let setSceneFun;
  let afterAddFun;
  let afterRemoveFun;
  const cacheSceneSet = /* @__PURE__ */ new WeakSet();
  return {
    name: OBJECT_HELPER_PLUGIN,
    install(engine) {
      const helperManager = new ObjectHelperManager();
      const helperMap = helperManager.objectHelperMap;
      engine.objectHelperManager = helperManager;
      engine.setObjectHelper = function(show) {
        if (show) {
          this.scene.traverse((object) => {
            if (helperMap.has(object)) {
              this.scene.add(helperMap.get(object));
            }
          });
        } else {
          for (let i = 0; i < this.scene.children.length; i++) {
            const object = this.scene.children[i];
            if (helperMap.has(object)) {
              this.scene.remove(helperMap.get(object));
            }
          }
        }
        return this;
      };
      const initSceneHelper = (scene) => {
        if (cacheSceneSet.has(scene)) {
          return;
        }
        scene.traverse((object) => {
          const helper = helperManager.addObjectHelper(object);
          helper && scene.add(helper);
        });
        cacheSceneSet.add(scene);
      };
      afterAddFun = (event) => {
        const objects = event.objects;
        for (const object of objects) {
          const helper = helperManager.addObjectHelper(object);
          if (!helper) {
            continue;
          }
          engine.scene.add(helper);
        }
      };
      afterRemoveFun = (event) => {
        const objects = event.objects;
        for (const object of objects) {
          const helper = helperManager.disposeObjectHelper(object);
          if (!helper) {
            continue;
          }
          engine.scene.remove(helper);
        }
      };
      engine.scene.addEventListener(AFTERADD, afterAddFun);
      engine.scene.addEventListener(AFTERREMOVE, afterRemoveFun);
      setSceneFun = (event) => {
        const scene = event.scene;
        !cacheSceneSet.has(scene) && initSceneHelper(scene);
        if (!scene.hasEventListener(AFTERADD, afterAddFun)) {
          scene.addEventListener(AFTERADD, afterAddFun);
        }
        if (!scene.hasEventListener(AFTERREMOVE, afterRemoveFun)) {
          scene.addEventListener(AFTERREMOVE, afterRemoveFun);
        }
      };
      engine.addEventListener(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
    },
    dispose(engine) {
      engine.objectHelperManager.objectHelperMap.forEach((helper) => {
        if (helper.parent) {
          helper.parent.remove(helper);
        }
      });
      engine.objectHelperManager.dispose();
      delete engine.objectHelperManager;
      delete engine.setObjectHelper;
      engine.removeEventListener(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
    }
  };
};
export { AFTERADD, AFTERREMOVE, OBJECT_HELPER_PLUGIN, ObjectHelperManager, ObjectHelperPlugin };
