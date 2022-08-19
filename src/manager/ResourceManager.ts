import { BaseEvent, EventDispatcher } from "../core/EventDispatcher";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { LoadOptions } from "./DataSupportManager";
import { getModule } from "../middleware/constants/CONFIGMODULE";
import { HTMLImageElementParser } from "../parser/HTMLImageElementParser";
import { HTMLCanvasElementParser } from "../parser/HTMLCanvasElementParser";
import { HTMLVideoElementParser } from "../parser/HTMLVideoElementParser";
import { Object3DParser } from "../parser/Object3DParser";
import { HTMLElementParser } from "../parser/HTMLElementParser";
import { TextureParser } from "../parser/TextureParser";
import { Parser, ResourceHanlder } from "../parser/Parser";
import { GLTFResourceParser } from "../parser/GLTFResourceParser";

export interface MappedEvent extends BaseEvent {
  structureMap: Map<string, unknown>;
  configMap: Map<string, SymbolConfig>;
  resourceMap: Map<string, unknown>;
  resourceConfig: { [key: string]: LoadOptions };
}

/**
 * @deprecated
 */
export enum RESOURCEEVENTTYPE {
  MAPPED = "mapped",
}

export interface MappingOptions {
  hanlder?: Record<string, string>;
}

export class ResourceManager extends EventDispatcher {
  /**
   * @deprecated - 可以直接从configMap里面拿
   */
  structureMap: Map<string, any> = new Map(); // 外部资源结构映射 url -> structure mappingUrl
  configMap: Map<string, SymbolConfig> = new Map(); // 配置映射 mappingUrl -> config
  resourceMap: Map<string, any> = new Map(); // 资源映射 mappingUrl -> resource

  private paserMap: Map<string, Parser> = new Map();
  private handlerMap = new Map<string, ResourceHanlder>();

  constructor(resources: { [key: string]: any } = {}) {
    super();

    this.addParser(new HTMLImageElementParser(), { warn: false })
      .addParser(new HTMLCanvasElementParser(), { warn: false })
      .addParser(new HTMLVideoElementParser(), { warn: false })
      .addParser(new Object3DParser(), { warn: false })
      .addParser(new HTMLElementParser(), { warn: false })
      .addParser(new TextureParser(), { warn: false })
      .addParser(new GLTFResourceParser(), { warn: false });

    const map = new Map<string, any>();

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
   * 添加解析器
   * @param parser  extends VIS.Parser
   * @returns this
   */
  addParser(parser: Parser, options: { warn: boolean } = { warn: true }): this {
    if (this.paserMap.has(parser.constructor.name)) {
      options.warn &&
        console.warn(
          `resourceManager has already exist this parser, that will be cover`,
          this.paserMap.get(parser.constructor.name)
        );
    }

    this.paserMap.set(parser.constructor.name, parser);

    this.addHanlder(parser.registHandler(), options);
    return this;
  }

  /**
   * 添加处理器
   * @param hanlder 处理器函数
   * @returns this
   */
  addHanlder(
    hanlder: ResourceHanlder,
    options: { warn: boolean } = { warn: true }
  ): this {
    if (this.handlerMap.has(hanlder.name)) {
      options.warn &&
        console.warn(
          `resourceManager has already exist this hanlder, that will be cover`,
          hanlder.name
        );
    }

    this.handlerMap.set(hanlder.name, hanlder);
    return this;
  }

  /**
   *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
   * @param loadResourceMap loaderManager的resourceMap
   * @param options options.handler: {url, hanlder}可以根据特定的url指定特定的解析器
   * @returns this
   */
  mappingResource(
    loadResourceMap: Map<string, unknown>,
    options?: MappingOptions
  ): this {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;

    const resourceConfig: { [key: string]: LoadOptions } = {};

    loadResourceMap.forEach((resource, url) => {
      // 如果options.handler规定了处理器，就使用handler
      if (options && options.hanlder && options.hanlder[url]) {
        const hanlder = this.handlerMap.get(options.hanlder[url]);

        if (!hanlder) {
          console.warn(
            `resource manager can not support this handler: ${options.hanlder[url]}`
          );
        } else {
          const parser = hanlder(url, resource, this.paserMap);

          if (!parser) {
            console.warn(
              `resource manager hanlder can not found this resource parser: `,
              resource,
              hanlder
            );
          } else {
            parser.parse({
              url,
              resource,
              configMap,
              resourceMap,
            });
            resourceConfig[url] = this.getResourceConfig(url);
          }
        }
      } else {
        // 冲上往下执行hanlder
        let parser: Parser | null = null;
        for (const handler of this.handlerMap.values()) {
          parser = handler(url, resource, this.paserMap);
          if (parser) {
            break;
          }
        }

        if (!parser) {
          console.warn(
            `resouce manager can not found some handler to parser this resource:`,
            resource
          );
        } else {
          parser.parse({
            url,
            resource,
            configMap,
            resourceMap,
          });
          resourceConfig[url] = this.getResourceConfig(url);
        }
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

  /**
   * 移除url下的所有资源
   * @param url url
   * @returns this
   */
  remove(url: string): this {
    const configMap = this.configMap;
    const resourceMap = this.resourceMap;

    // 便利urlList找出所有以 url 开头的的结构组成LoadOptions配置单
    [...configMap.keys()]
      .filter((key) => key.startsWith(url))
      .forEach((url) => {
        configMap.delete(url);
        const resource = resourceMap.get(url);
        (resource as any).dispose && (resource as any).dispose();
        resourceMap.delete(url);
      });
    return this;
  }

  /**
   * 清空所有资源
   */
  dispose() {
    this.resourceMap.forEach((object, url) => {
      (object as any).dispose && (object as any).dispose();
    });

    this.resourceMap.clear();

    this.configMap.clear();
  }
}
