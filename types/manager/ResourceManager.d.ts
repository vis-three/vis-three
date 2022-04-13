import { BaseEvent } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
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
    configMap: Map<string, unknown>;
    resourceMap: Map<string, unknown>;
}
export declare enum RESOURCEEVENTTYPE {
    MAPPED = "mapped"
}
export declare class ResourceManager extends EventDispatcher {
    structureMap: Map<string, unknown>;
    configMap: Map<string, unknown>;
    resourceMap: Map<string, unknown>;
    private configModuleMap;
    private mappingHandler;
    constructor();
    private Object3DHandler;
    private HTMLImageElementHandler;
    private HTMLCanvasElementHanlder;
    private HTMLVideoElementHander;
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
    remove(url: string): void;
    dispose(): void;
}
