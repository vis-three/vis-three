import { BaseEvent, EventDispatcher } from "../../eventDispatcher";
import { LoadOptions } from "../DataSupportManagerPlugin/DataSupportManager";
import { Parser, ResourceHanlder } from "../../parser/Parser";
import { SymbolConfig } from "../../../middleware";
export interface MappedEvent extends BaseEvent {
    configMap: Map<string, SymbolConfig>;
    resourceMap: Map<string, unknown>;
    resourceConfig: {
        [key: string]: LoadOptions;
    };
}
/**
 * @deprecated
 */
export declare enum RESOURCEEVENTTYPE {
    MAPPED = "mapped"
}
export interface MappingOptions {
    selector?: Record<string, ResourceHanlder>;
    parser?: Record<string, Parser>;
}
export declare class ResourceManager extends EventDispatcher {
    configMap: Map<string, SymbolConfig>;
    resourceMap: Map<string, any>;
    private paserMap;
    constructor(resources?: {
        [key: string]: any;
    });
    /**
     * 添加解析器
     * @param parser  extends VIS.Parser
     * @returns this
     */
    addParser(parser: Parser): this;
    /**
     *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
     * @param loadResourceMap loaderManager的resourceMap
     * @param options options.handler: {url, hanlder}可以根据特定的url指定特定的解析器
     * @returns this
     */
    mappingResource(loadResourceMap: Map<string, unknown>, options?: MappingOptions): this;
    /**
     * 获取资源的配置单，该配置单根据资源结构生成
     * @param url 资源url
     * @returns LoadOptions
     */
    getResourceConfig(url: string): LoadOptions;
    /**
     * 是否有此资源
     * @param url 资源 url
     * @returns boolean
     */
    hasResource(url: string): boolean;
    /**
     * 移除url下的所有资源
     * @param url url
     * @returns this
     */
    remove(url: string): this;
    /**
     * 清空所有资源
     */
    dispose(): void;
}
