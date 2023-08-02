var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { Vector3, Bone, Texture } from "three";
import { v4 } from "uuid";
import { syncObject } from "@vis-three/utils";
import { Parser, CONFIGFACTORY, CONFIGTYPE } from "@vis-three/middleware";
class Object3DParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource.isObject3D) {
        return parseMap.get(Object3DParser) || null;
      } else {
        return null;
      }
    });
  }
  parse(params) {
    this.parseObject3D(params);
  }
  parseAnimation({ url, resource, configMap, resourceMap }) {
    resourceMap.set(url, resource);
    const config = CONFIGFACTORY[CONFIGTYPE.LOADANIMATIONCLIP]();
    config.vid = v4();
    config.url = url;
    config.name = resource.name;
    configMap.set(url, config);
  }
  parseColor(color) {
    return `rgb(${Math.round(255 * color.r)}, ${Math.round(
      255 * color.g
    )}, ${Math.round(255 * color.b)})`;
  }
  attributeEnhance(object) {
    const result = {};
    for (const key in object) {
      if (key.startsWith("_")) {
        result[key.slice(1)] = object[key];
      } else {
        result[key] = object[key];
      }
    }
    return result;
  }
  parseTexture({ url, resource, configMap, resourceMap }) {
    resourceMap.set(url, resource);
    const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
    configMap.set(url, config);
    config.vid = v4();
    config.url = url;
    syncObject(
      resource,
      config,
      {
        type: true,
        vid: true,
        url: true
      }
    );
  }
  parseMaterial({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    resourceMap.set(url, resource);
    if (!CONFIGFACTORY[resource.type]) {
      console.warn(
        `can not found support config in vis for this resource`,
        resource
      );
      return;
    }
    const config = CONFIGFACTORY[resource.type]();
    configMap.set(url, config);
    config.vid = v4();
    syncObject(
      this.attributeEnhance(resource),
      config,
      {
        type: true,
        vid: true
      }
    );
    for (const key in resource) {
      if (!resource[key]) {
        continue;
      }
      if (resource[key].isColor) {
        config[key] = this.parseColor(resource[key]);
      } else if (key.toLocaleLowerCase().endsWith("map") && resource[key]) {
        const textureUrl = `${url}.${key}`;
        this.parseTexture({
          url: textureUrl,
          resource: resource[key],
          configMap,
          resourceMap
        });
        config[key] = configMap.get(textureUrl).vid;
      }
    }
  }
  parseGeometry({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    resourceMap.set(url, resource);
    resource.computeBoundingBox();
    const box = resource.boundingBox;
    const center = box.getCenter(new Vector3());
    const config = CONFIGFACTORY[CONFIGTYPE.LOADGEOMETRY]();
    config.vid = v4();
    config.url = url;
    config.position.x = center.x / (box.max.x - box.min.x) * 2;
    config.position.y = center.y / (box.max.y - box.min.y) * 2;
    config.position.z = center.z / (box.max.z - box.min.z) * 2;
    configMap.set(url, config);
  }
  parseSkeleton({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    const config = CONFIGFACTORY[CONFIGTYPE.SKELETON]();
    config.vid = v4();
    const boneConfigMap = /* @__PURE__ */ new WeakMap();
    for (const [url2, object] of resourceMap.entries()) {
      if (object instanceof Bone) {
        boneConfigMap.set(object, configMap.get(url2));
      }
    }
    for (const bone of resource.bones) {
      if (!boneConfigMap.has(bone)) {
        console.warn(`object3D parser can not fond bone in configMap`, bone);
        continue;
      }
      config.bones.push(boneConfigMap.get(bone).vid);
    }
    configMap.set(url, config);
  }
  parseObject3D({
    url,
    resource,
    configMap,
    resourceMap
  }) {
    resourceMap.set(url, resource);
    if (!CONFIGFACTORY[resource.type]) {
      console.warn(
        `can not found support config in middleware module for this resource`,
        resource
      );
      return;
    }
    const config = CONFIGFACTORY[resource.type]();
    config.vid = v4();
    syncObject(
      resource,
      config,
      {
        type: true,
        vid: true,
        children: true,
        geometry: true,
        material: true,
        parent: true,
        lookAt: true,
        skeleton: true
      }
    );
    config.rotation.x = resource.rotation.x;
    config.rotation.y = resource.rotation.y;
    config.rotation.z = resource.rotation.z;
    configMap.set(url, config);
    if (resource.material) {
      if (Array.isArray(resource.material)) {
        config.material = [];
        resource.material.forEach((material, i, arr) => {
          const materialUrl = `${url}.material.${i}`;
          this.parseMaterial({
            url: materialUrl,
            resource: material,
            configMap,
            resourceMap
          });
          config.material.push(configMap.get(materialUrl).vid);
        });
      } else {
        const materialUrl = `${url}.material`;
        this.parseMaterial({
          url: materialUrl,
          resource: resource.material,
          configMap,
          resourceMap
        });
        config.material = configMap.get(materialUrl).vid;
      }
    }
    if (resource.geometry) {
      const geometryUrl = `${url}.geometry`;
      this.parseGeometry({
        url: geometryUrl,
        resource: resource.geometry,
        configMap,
        resourceMap
      });
      config.geometry = configMap.get(geometryUrl).vid;
    }
    if (resource.skeleton) {
      const skeletonUrl = `${url}.skeleton`;
      this.parseSkeleton({
        url: skeletonUrl,
        resource: resource.skeleton,
        configMap,
        resourceMap
      });
      config.skeleton = configMap.get(skeletonUrl).vid;
    }
    if (resource.children && resource.children.length) {
      const cacheChildren = [];
      resource.children.forEach((object, i) => {
        if (object.type === "Bone") {
          cacheChildren.unshift({
            index: i,
            object,
            type: object.type
          });
        } else {
          cacheChildren.push({
            index: i,
            object,
            type: object.type
          });
        }
      });
      cacheChildren.forEach((item) => {
        const objectUrl = `${url}.children.${item.index}`;
        this.parseObject3D({
          url: objectUrl,
          resource: item.object,
          configMap,
          resourceMap
        });
        config.children.push(configMap.get(objectUrl).vid);
      });
    }
  }
}
class FBXResourceParser extends Object3DParser {
  constructor() {
    super();
  }
}
class GLTFResourceParser extends Parser {
  constructor() {
    super();
    __publicField(this, "object3DParser", new Object3DParser());
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource.parser && resource.animations && resource.scene && resource.scenes) {
        return parseMap.get(GLTFResourceParser) || null;
      } else {
        return null;
      }
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    this.object3DParser.parse({
      url: `${url}.scene`,
      resource: resource.scene,
      configMap,
      resourceMap
    });
    resource.animations.forEach((animationClip, i) => {
      this.object3DParser.parseAnimation({
        url: `${url}.animations.${i}`,
        resource: animationClip,
        configMap,
        resourceMap
      });
    });
  }
}
class HTMLCanvasElementParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource instanceof HTMLCanvasElement) {
        return parseMap.get(HTMLCanvasElementParser) || null;
      } else {
        return null;
      }
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    const config = CONFIGFACTORY[CONFIGTYPE.CANVASTEXTURE]();
    config.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
class HTMLImageElementParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource instanceof HTMLImageElement) {
        return parseMap.get(HTMLImageElementParser) || null;
      } else {
        return null;
      }
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    const config = CONFIGFACTORY[CONFIGTYPE.IMAGETEXTURE]();
    config.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
class HTMLVideoElementParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource instanceof HTMLVideoElement) {
        return parseMap.get(HTMLVideoElementParser) || null;
      } else {
        return null;
      }
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    const config = CONFIGFACTORY[CONFIGTYPE.VIDEOTEXTURE]();
    config.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
class TextureParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource instanceof Texture) {
        return parseMap.get(TextureParser) || null;
      } else {
        return null;
      }
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
    config.url = url;
    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
class HTMLElementParser extends Parser {
  constructor() {
    super(...arguments);
    __publicField(this, "selector", (url, resource, parseMap) => {
      if (resource instanceof HTMLElement) {
        return parseMap.get(HTMLElementParser) || null;
      } else {
        return null;
      }
    });
  }
  parse({ url, resource, configMap, resourceMap }) {
    const config = CONFIGFACTORY[CONFIGTYPE.CSS3DPLANE]();
    config.element = url;
    resourceMap.set(url, resource);
    configMap.set(url, config);
  }
}
export { FBXResourceParser, GLTFResourceParser, HTMLCanvasElementParser, HTMLElementParser, HTMLImageElementParser, HTMLVideoElementParser, Object3DParser, TextureParser };
