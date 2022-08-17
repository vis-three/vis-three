import { BaseEvent, Object3D, Texture } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { LoadOptions } from "./DataSupportManager";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { HTMLImageElementParser } from "../parser/HTMLImageElementParser";
import { HTMLCanvasElementParser } from "../parser/HTMLCanvasElementParser";
import { HTMLVideoElementParser } from "../parser/HTMLVideoElementParser";
import { Object3DParser } from "../parser/Object3DParser";
import { HTMLElementParser } from "../parser/HTMLElementParser";
import { TextureParser } from "../parser/TextureParser";
import { Parser } from "../parser/Parser";

export interface MappedEvent extends BaseEvent {
  structureMap: Map<string, unknown>;
  configMap: Map<string, SymbolConfig>;
  resourceMap: Map<string, unknown>;
  resourceConfig: { [key: string]: LoadOptions };
}

export enum RESOURCEEVENTTYPE {
  MAPPED = "mapped",
}

export class ResourceManager extends EventDispatcher {
  /**
   * @deprecated - 可以直接从configMap里面拿
   */
  structureMap: Map<string, any> = new Map(); // 外部资源结构映射 url -> structure mappingUrl
  configMap: Map<string, SymbolConfig> = new Map(); // 配置映射 mappingUrl -> config
  resourceMap: Map<string, any> = new Map(); // 资源映射 mappingUrl -> resource

  private mappingHandler = new Map<any, Parser>();

  constructor(resources: { [key: string]: any } = {}) {
    super();
    const mappingHandler = this.mappingHandler;

    mappingHandler.set(HTMLImageElement, new HTMLImageElementParser());
    mappingHandler.set(HTMLCanvasElement, new HTMLCanvasElementParser());
    mappingHandler.set(HTMLVideoElement, new HTMLVideoElementParser());
    mappingHandler.set(Object3D, new Object3DParser());
    mappingHandler.set(HTMLElement, new HTMLElementParser());
    mappingHandler.set(Texture, new TextureParser());

    const map = new Map<string, unknown>();
    for (const key in resources) {
      if (map.has(key)) {
        console.warn(
          `resourceManager construct params rescource already exist: ${key}, that will be cover.`
        );
      }

      map.set(key, resources[key]);
    }

    this.mappingResource(map);
  }

  /**
   *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
   * @param loadResourceMap loaderManager的resourceMap
   * @returns this
   */
  mappingResource(loadResourceMap: Map<string, unknown>): this {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;

    const mappingHandler = this.mappingHandler;

    const resourceHanlder = (
      url: string,
      object: object,
      prototype: object
    ): boolean => {
      if (!Object.getPrototypeOf(prototype)) {
        return false;
      } else if (
        mappingHandler.has(Object.getPrototypeOf(prototype).constructor)
      ) {
        mappingHandler
          .get(Object.getPrototypeOf(prototype).constructor)!
          .parse({
            url,
            resource: object,
            configMap: this.configMap,
            resourceMap: this.resourceMap,
          });
        return true;
      } else {
        return resourceHanlder(url, object, Object.getPrototypeOf(prototype));
      }
    };

    const resourceConfig: { [key: string]: LoadOptions } = {};

    loadResourceMap.forEach((resource, url) => {
      // 图片贴图
      if (!resourceHanlder(url, resource as object, resource as object)) {
        resourceMap.set(url, resource);
        console.warn(
          `resource manager can not support this resource to generate config`,
          resource
        );
      } else {
        resourceConfig[url] = this.getResourceConfig(url);
      }
    });

    this.dispatchEvent({
      type: "mapped",
      structureMap: this.structureMap,
      configMap,
      resourceMap,
      resourceConfig,
    });
    return this;
  }

  /**
   * 获取资源的配置单，该配置单根据资源结构生成
   * @param url 资源url
   * @returns LoadOptions
   */
  getResourceConfig(url: string): LoadOptions {
    const configMap = this.configMap;
    const loadOptions = {};

    // 便利urlList找出所有以 url 开头的的结构组成LoadOptions配置单
    [...configMap.keys()]
      .filter((key) => key.startsWith(url))
      .some((url) => {
        const config = configMap.get(url);

        if (!config) {
          console.error(`unknow error: can not found config by url: ${url}`);
        } else {
          const module = getModule(config.type);

          if (!module) {
            console.error(
              `unknow error: can not found module by type: ${config.type}`,
              config
            );
          } else {
            !loadOptions[module] && (loadOptions[module] = {});

            loadOptions[module][config.vid] = config;
          }
        }
      });

    return loadOptions;
  }

  /**
   * 是否有此资源
   * @param url 资源 url
   * @returns boolean
   */
  hasResource(url: string): boolean {
    return this.resourceMap.has(url);
  }

  // TODO: 根据strictureMap去清空configMap和resourceMap
  remove(url: string): this {
    return this;
  }

  // TODO: dispose
  dispose() {
    this.resourceMap.forEach((object, url) => {
      (object as any).dispose && (object as any).dispose();
    });

    this.resourceMap.clear();

    this.configMap.clear();
  }
}
