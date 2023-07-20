import { Bone, Vector3, } from "three";
import { v4 } from "uuid";
import { syncObject } from "@vis-three/utils";
import { CONFIGFACTORY, CONFIGTYPE, Parser, } from "@vis-three/middleware";
export class Object3DParser extends Parser {
    selector = (url, resource, parseMap) => {
        if (resource.isObject3D) {
            return parseMap.get(Object3DParser) || null;
        }
        else {
            return null;
        }
    };
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
    /**
     * 解析颜色
     * @param color
     * @returns examples - rgb(255, 255,255)
     */
    parseColor(color) {
        return `rgb(${Math.round(255 * color.r)}, ${Math.round(255 * color.g)}, ${Math.round(255 * color.b)})`;
    }
    /**
     * 对象增强,class对象的get set属性转key， three中的是通过_key进行闭包
     * @param object
     * @returns object
     */
    attributeEnhance(object) {
        const result = {};
        for (const key in object) {
            if (key.startsWith("_")) {
                result[key.slice(1)] = object[key];
            }
            else {
                result[key] = object[key];
            }
        }
        return result;
    }
    /**
     *  解析贴图
     * @param params
     */
    parseTexture({ url, resource, configMap, resourceMap }) {
        resourceMap.set(url, resource);
        const config = CONFIGFACTORY[CONFIGTYPE.LOADTEXTURE]();
        configMap.set(url, config);
        config.vid = v4();
        config.url = url;
        syncObject(resource, config, {
            type: true,
            vid: true,
            url: true,
        });
    }
    parseMaterial({ url, resource, configMap, resourceMap, }) {
        resourceMap.set(url, resource);
        if (!CONFIGFACTORY[resource.type]) {
            console.warn(`can not found support config in vis for this resource`, resource);
            return;
        }
        const config = CONFIGFACTORY[resource.type]();
        configMap.set(url, config);
        config.vid = v4();
        syncObject(this.attributeEnhance(resource), config, {
            type: true,
            vid: true,
        });
        // 同步颜色配置
        // 同步贴图
        for (const key in resource) {
            if (!resource[key]) {
                continue;
            }
            if (resource[key].isColor) {
                config[key] = this.parseColor(resource[key]);
            }
            else if (key.toLocaleLowerCase().endsWith("map") && resource[key]) {
                const textureUrl = `${url}.${key}`;
                this.parseTexture({
                    url: textureUrl,
                    resource: resource[key],
                    configMap,
                    resourceMap,
                });
                // 同步配置
                config[key] = configMap.get(textureUrl).vid;
            }
        }
    }
    parseGeometry({ url, resource, configMap, resourceMap, }) {
        resourceMap.set(url, resource);
        resource.computeBoundingBox();
        const box = resource.boundingBox;
        const center = box.getCenter(new Vector3());
        const config = CONFIGFACTORY[CONFIGTYPE.LOADGEOMETRY]();
        config.vid = v4();
        config.url = url;
        config.position.x = (center.x / (box.max.x - box.min.x)) * 2;
        config.position.y = (center.y / (box.max.y - box.min.y)) * 2;
        config.position.z = (center.z / (box.max.z - box.min.z)) * 2;
        configMap.set(url, config);
    }
    parseSkeleton({ url, resource, configMap, resourceMap, }) {
        const config = CONFIGFACTORY[CONFIGTYPE.SKELETON]();
        config.vid = v4();
        const boneConfigMap = new WeakMap();
        for (const [url, object] of resourceMap.entries()) {
            if (object instanceof Bone) {
                boneConfigMap.set(object, configMap.get(url));
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
    parseObject3D({ url, resource, configMap, resourceMap, }) {
        resourceMap.set(url, resource);
        if (!CONFIGFACTORY[resource.type]) {
            console.warn(`can not found support config in middleware module for this resource`, resource);
            return;
        }
        const config = CONFIGFACTORY[resource.type]();
        config.vid = v4();
        // 将一般属性同步到配置
        syncObject(resource, config, {
            type: true,
            vid: true,
            children: true,
            geometry: true,
            material: true,
            parent: true,
            lookAt: true,
            skeleton: true,
        });
        config.rotation.x = resource.rotation.x;
        config.rotation.y = resource.rotation.y;
        config.rotation.z = resource.rotation.z;
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
                    config.material.push(configMap.get(materialUrl).vid);
                });
            }
            else {
                const materialUrl = `${url}.material`;
                this.parseMaterial({
                    url: materialUrl,
                    resource: resource.material,
                    configMap,
                    resourceMap,
                });
                // 同步配置
                config.material = configMap.get(materialUrl).vid;
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
            config.geometry = configMap.get(geometryUrl).vid;
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
            config.skeleton = configMap.get(skeletonUrl).vid;
        }
        // 解析children
        if (resource.children && resource.children.length) {
            resource.children.forEach((object, i, arr) => {
                const objectUrl = `${url}.children.${i}`;
                this.parseObject3D({
                    url: objectUrl,
                    resource: object,
                    configMap,
                    resourceMap,
                });
                // 同步配置
                config.children.push(configMap.get(objectUrl).vid);
            });
        }
    }
}
