import { BaseEvent, EventDispatcher } from "../../eventDispatcher";
import { LoadOptions } from "../DataSupportManagerPlugin/DataSupportManager";
import { HTMLImageElementParser } from "../../parser/HTMLImageElementParser";
import { HTMLCanvasElementParser } from "../../parser/HTMLCanvasElementParser";
import { HTMLVideoElementParser } from "../../parser/HTMLVideoElementParser";
import { Object3DParser } from "../../parser/Object3DParser";
import { HTMLElementParser } from "../../parser/HTMLElementParser";
import { TextureParser } from "../../parser/TextureParser";
import { Parser, ResourceHanlder } from "../../parser/Parser";
import { GLTFResourceParser } from "../../parser/GLTFResourceParser";
import { FBXResourceParser } from "../../parser/FBXResourceParser";
import { getModule, SymbolConfig } from "../../../middleware";

export interface MappedEvent extends BaseEvent {
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
  selector?: Record<string, ResourceHanlder>;
  parser?: Record<string, Parser>;
}

export class ResourceManager extends EventDispatcher {
  configMap: Map<string, SymbolConfig> = new Map(); // 配置映射 mappingUrl -> config
  resourceMap: Map<string, any> = new Map(); // 资源映射 mappingUrl -> resource

  private paserMap: Map<Function, Parser> = new Map();

  constructor(resources: { [key: string]: any } = {}) {
    super();

    this.addParser(new HTMLImageElementParser())
      .addParser(new HTMLCanvasElementParser())
      .addParser(new HTMLVideoElementParser())
      .addParser(new Object3DParser())
      .addParser(new HTMLElementParser())
      .addParser(new TextureParser())
      .addParser(new GLTFResourceParser())
      .addParser(new FBXResourceParser());

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
  addParser(parser: Parser): this {
    if (this.paserMap.has(parser.constructor)) {
      return this;
    }

    this.paserMap.set(parser.constructor, parser);
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
    const parserList = [...this.paserMap.values()];

    const resourceConfig: { [key: string]: LoadOptions } = {};

    for (const [url, resource] of loadResourceMap.entries()) {
      // 如果指定了url的解析器，用解析器处理
      if (options?.parser && options.parser[url]) {
        options.parser[url].parse({
          url,
          resource,
          configMap,
          resourceMap,
        });
        continue;
      }

      // 如果options.selector规定了选择器用 selector
      if (options?.selector && options.selector[url]) {
        const parser = options.selector[url](url, resource, this.paserMap);

        if (!parser) {
          console.warn(
            `resource manager hanlder can not found this resource parser: `,
            resource,
            options.selector[url]
          );
          continue;
        }

        parser.parse({
          url,
          resource,
          configMap,
          resourceMap,
        });
        resourceConfig[url] = this.getResourceConfig(url);
        continue;
      }

      // 从上往下执行parser selector
      let parser: Parser | null = null;

      for (const TParser of parserList) {
        parser = TParser.selector(url, resource, this.paserMap);
        if (parser) {
          break;
        }
      }

      if (!parser) {
        console.warn(
          `resouce manager can not found some handler to parser this resource:`,
          resource
        );
        continue;
      }

      parser.parse({
        url,
        resource,
        configMap,
        resourceMap,
      });
      resourceConfig[url] = this.getResourceConfig(url);
    }

    this.dispatchEvent({
      type: "mapped",
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
      .forEach((url) => {
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
            !loadOptions[module] && (loadOptions[module] = []);

            loadOptions[module].push(config);
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
