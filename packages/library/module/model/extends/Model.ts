import {
  Box3,
  Intersection,
  Material,
  Mesh,
  Object3D,
  Raycaster,
  Texture,
} from "three";
import { clone as skeletonClone } from "three/examples/jsm/utils/SkeletonUtils.js";
export interface Model extends Object3D {
  cacheBox: Box3;
  boundingBox: Box3;
}

function modelRaycast(
  this: Model,
  raycaster: Raycaster,
  intersects: Intersection[],
) {
  this.boundingBox.copy(this.cacheBox).applyMatrix4(this.matrixWorld);

  if (raycaster.ray.intersectsBox(this.boundingBox)) {
    intersects.push({
      distance: raycaster.ray.origin.distanceTo(this.position),
      object: this,
      point: this.position,
    });
  }
}
const invalidRaycast = () => {};

// 深度克隆
const deepClone = (object: Object3D) => {
  const newObject = skeletonClone(object);

  newObject.traverse((object) => {
    const ob = object as Mesh;

    if (ob.geometry) {
      ob.geometry = ob.geometry.clone();
    }

    if (ob.material) {
      const cloneTexture = (material: Material) => {
        for (const key of Object.keys(material)) {
          if (
            typeof material[key] === "object" &&
            material[key] !== null &&
            (<Texture>material[key]).isTexture
          ) {
            (<Texture>material[key]) = (<Texture>material[key]).clone();
          }
        }
      };

      if (Array.isArray(ob.material)) {
        ob.material = ob.material.map((mat) => mat.clone());
        //材质克隆
        for (const material of ob.material) {
          cloneTexture(material);
        }
      } else {
        ob.material = ob.material.clone();

        cloneTexture(ob.material);
      }
    }
  });

  return newObject;
};

// 一般的模型都会打包到一个跟对象中
export function createModel(object: Object3D, raw: boolean) {
  const newObject = deepClone(object) as Model;

  // @ts-ignore
  newObject.type = "Model";
  newObject.cacheBox = new Box3();
  newObject.boundingBox = new Box3();
  newObject.cacheBox.setFromObject(newObject, true);

  newObject.traverse((object) => {
    object.raycast = invalidRaycast;
  });

  newObject.raycast = modelRaycast;

  return newObject;
}
