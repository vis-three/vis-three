import {
  AnimationClip,
  Bone,
  Color,
  Material,
  Matrix4,
  Object3D,
  Texture,
  Vector3,
} from "three";
import { v4 } from "uuid";
import { syncObject } from "@vis-three/utils";
import {
  CONFIGFACTORY,
  CONFIGTYPE,
  ParseParams,
  Parser,
  ResourceHanlder,
} from "@vis-three/middleware";
import { LoadTextureConfig } from "@vis-three/module-texture/TextureConfig";
import { LoadGeometryConfig } from "@vis-three/module-geometry/GeometryInterface";
import { SolidObjectConfig } from "@vis-three/module-solid-object";
import { MaterialConfig } from "@vis-three/module-material/MaterialConfig";
import { SkinnedMeshConfig } from "@vis-three/module-skinned-mesh";
import { SkeletonConfig } from "@vis-three/module-skeleton";
import { BoneConfig } from "@vis-three/module-bone";
import { LoadAnimationClipConfig } from "@vis-three/module-animation-clip";
import { MeshConfig } from "@vis-three/module-mesh";

export class Object3DParser extends Parser {
  selector: ResourceHanlder = (
    url: string,
    resource: Object3D,
    parseMap: Map<Function, Parser>
  ) => {
    if (resource.isObject3D) {
      return parseMap.get(Object3DParser) || null;
    } else {
      return null;
    }
  };

  parse(params: ParseParams): void {
    this.parseObject3D(params);
  }

  parseAnimation({ url, resource, configMap, resourceMap }: ParseParams) {
    resourceMap.set(url, resource);

    const config = CONFIGFACTORY[
      CONFIGTYPE.LOADANIMATIONCLIP
    ]() as LoadAnimationClipConfig;

    config.vid = v4();
    config.url = url;
    config.name = resource.name;

    configMap.set(url, config);
  }

  /**
   * 解析颜色
   * @param color
   * @returns examples - rgb(255, 255,255)
   */
  private parseColor(color: Color): string {
    return `rgb(${Math.round(255 * color.r)}, ${Math.round(
      255 * color.g
    )}, ${Math.round(255 * color.b)})`;
  }

  /**
   * 对象增强,class对象的get set属性转key， three中的是通过_key进行闭包
   * @param object
   * @returns object
   */
  private attributeEnhance<O extends object>(object: O): O {
    const result: O = {} as O;

    for (const key in object) {
      if (key.startsWith("_")) {
        result[key.slice(1)] = object[key];
      } else {
        result[key] = object[key];
      }
    }
    return result;
  }

  /**
   *  解析贴图
   * @param params
   */
  private parseTexture({ url, resource, configMap, resourceMap }: ParseParams) {
    resourceMap.set(url, resource);

    const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]() as LoadTextureConfig;
    configMap.set(url, config);

    config.vid = v4();
    config.url = url;

    syncObject<LoadTextureConfig, Texture>(
      resource,
      config as unknown as Texture,
      {
        type: true,
        vid: true,
        url: true,
      }
    );
  }

  private parseMaterial({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
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

    syncObject<MaterialConfig, Material>(
      this.attributeEnhance(resource),
      config as unknown as Material,
      {
        type: true,
        vid: true,
      }
    );

    // 同步颜色配置
    // 同步贴图

    for (const key in resource) {
      if (!resource[key]) {
        continue;
      }

      if ((<Color>resource[key]).isColor) {
        config[key] = this.parseColor(resource[key]);
      } else if (key.toLocaleLowerCase().endsWith("map") && resource[key]) {
        const textureUrl = `${url}.${key}`;

        this.parseTexture({
          url: textureUrl,
          resource: resource[key],
          configMap,
          resourceMap,
        });

        // 同步配置
        config[key] = configMap.get(textureUrl)!.vid;
      }
    }
  }

  private parseGeometry({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
    resourceMap.set(url, resource);

    resource.computeBoundingBox();
    const box = resource.boundingBox!;
    const center = box.getCenter(new Vector3());

    const config = CONFIGFACTORY[
      CONFIGTYPE.LOADGEOMETRY
    ]() as LoadGeometryConfig;
    config.vid = v4();
    config.url = url;
    config.position.x = (center.x / (box.max.x - box.min.x)) * 2;
    config.position.y = (center.y / (box.max.y - box.min.y)) * 2;
    config.position.z = (center.z / (box.max.z - box.min.z)) * 2;

    configMap.set(url, config);
  }

  private parseSkeleton({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
    const config = CONFIGFACTORY[CONFIGTYPE.SKELETON]() as SkeletonConfig;
    config.vid = v4();

    const boneConfigMap: WeakMap<Bone, BoneConfig> = new WeakMap();

    for (const [url, object] of resourceMap.entries()) {
      if (object instanceof Bone) {
        boneConfigMap.set(object, configMap.get(url) as BoneConfig);
      }
    }

    for (const bone of resource.bones) {
      if (!boneConfigMap.has(bone)) {
        console.warn(`object3D parser can not fond bone in configMap`, bone);
        continue;
      }
      config.bones.push(boneConfigMap.get(bone)!.vid);
    }

    if (resource.boneInverses.length) {
      config.boneInverses = resource.boneInverses.map((matrix: Matrix4) =>
        (<number[]>[]).concat(matrix.elements)
      );
    }

    configMap.set(url, config);
  }

  private parseObject3D({
    url,
    resource,
    configMap,
    resourceMap,
  }: ParseParams) {
    resourceMap.set(url, resource);

    if (!CONFIGFACTORY[resource.type]) {
      console.warn(
        `can not found support config in middleware module for this resource`,
        resource
      );
      return;
    }

    const config = CONFIGFACTORY[resource.type]() as SkinnedMeshConfig;
    config.vid = v4();

    // 将一般属性同步到配置
    syncObject<SkinnedMeshConfig, Object3D>(
      resource,
      config as unknown as Object3D,
      {
        type: true,
        vid: true,
        children: true,
        geometry: true,
        material: true,
        parent: true,
        lookAt: true, // load object是没有lookAt的
        skeleton: true,
      }
    );

    config.rotation.x = resource.rotation.x;
    config.rotation.y = resource.rotation.y;
    config.rotation.z = resource.rotation.z;

    if (
      resource.isMesh &&
      resource.morphTargetInfluences &&
      resource.morphTargetInfluences.length
    ) {
      (<MeshConfig>(<unknown>config)).morphTargetInfluences = [
        ...resource.morphTargetInfluences,
      ];
      (<MeshConfig>(<unknown>config)).morphTargetDictionary = {
        ...resource.morphTargetDictionary,
      };
    }

    if (resource.isSkinnedMesh) {
      config.bindMatrix = [].concat(resource.bindMatrix.elements);
    }

    configMap.set(url, config);

    // 解析材质
    if (resource.material) {
      if (Array.isArray(resource.material)) {
        config.material = [];
        resource.material.forEach((material, i, arr) => {
          const materialUrl = `${url}.material.${i}`;

          this.parseMaterial({
            url: materialUrl,
            resource: material,

            configMap,
            resourceMap,
          });

          // 同步配置
          (<string[]>config.material).push(configMap.get(materialUrl)!.vid);
        });
      } else {
        const materialUrl = `${url}.material`;

        this.parseMaterial({
          url: materialUrl,
          resource: resource.material,

          configMap,
          resourceMap,
        });

        // 同步配置
        config.material = configMap.get(materialUrl)!.vid;
      }
    }

    // 解析几何
    if (resource.geometry) {
      const geometryUrl = `${url}.geometry`;

      this.parseGeometry({
        url: geometryUrl,
        resource: resource.geometry,

        configMap,
        resourceMap,
      });

      // 同步配置
      config.geometry = configMap.get(geometryUrl)!.vid;
    }

    // 解析骨架
    if (resource.skeleton) {
      const skeletonUrl = `${url}.skeleton`;

      this.parseSkeleton({
        url: skeletonUrl,
        resource: resource.skeleton,

        configMap,
        resourceMap,
      });

      config.skeleton = configMap.get(skeletonUrl)!.vid;
    }

    // 解析children
    if (resource.children && resource.children.length) {
      // 如果有bone先解析bone
      const cacheChildren: { index: number; object: Object3D; type: string }[] =
        [];

      resource.children.forEach((object, i) => {
        if (object.type === "Bone") {
          cacheChildren.unshift({
            index: i,
            object,
            type: object.type,
          });
        } else {
          cacheChildren.push({
            index: i,
            object,
            type: object.type,
          });
        }
      });

      cacheChildren.forEach((item) => {
        const objectUrl = `${url}.children.${item.index}`;

        this.parseObject3D({
          url: objectUrl,
          resource: item.object,

          configMap,
          resourceMap,
        });

        // 同步配置
        config.children.push(configMap.get(objectUrl)!.vid);
      });
    }

    // 解析动画
    if (resource.animations && resource.animations.length) {
      if (Array.isArray(resource.animations)) {
        resource.animations.forEach((elem: AnimationClip, i: number) => {
          const animationUrl = `${url}.animations.${i}`;

          this.parseAnimation({
            url: animationUrl,
            resource: elem,
            configMap,
            resourceMap,
          });
        });
      }
    }
  }
}
