import { BaseEvent } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
export interface ObjectMappingStructure {
    type: string;
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
    constructor();
    mappingResource(loadResourceMap: Map<string, unknown>): this;
    remove(url: string): void;
    dispose(): void;
}
