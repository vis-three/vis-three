import { BaseEvent } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { LoadOptions } from "./DataSupportManager";
export interface ObjectMappingStructure {
    type: string;
    url: string;
    geometry?: string;
    material?: string | string[];
    children?: ObjectMappingStructure[];
}
export interface MappedEvent extends BaseEvent {
    structureMap: Map<string, unknown>;
    configMap: Map<string, SymbolConfig>;
    resourceMap: Map<string, unknown>;
    resourceConfig: {
        [key: string]: LoadOptions;
    };
}
export declare enum RESOURCEEVENTTYPE {
    MAPPED = "mapped"
}
export declare class ResourceManager extends EventDispatcher {
    structureMap: Map<string, unknown>;
    configMap: Map<string, SymbolConfig>;
    resourceMap: Map<string, unknown>;
    private mappingHandler;
    constructor(resources?: {
        [key: string]: any;
    });
    private Object3DHandler;
    private HTMLImageElementHandler;
    private HTMLCanvasElementHandler;
    private HTMLVideoElementHandler;
    private HTMLDivElementHandler;
    private HTMLSpanElementHandler;
    private DataTextureElementHandler;
    /**
     *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
     * @param loadResourceMap loaderManager的resourceMap
     * @returns this
     */
    mappingResource(loadResourceMap: Map<string, unknown>): this;
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
    remove(url: string): this;
    dispose(): void;
}
