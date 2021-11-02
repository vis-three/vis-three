import { BaseEvent, EventDispatcher } from "three";
export interface ModelMappingUrlConfig {
    type: string;
    geometry?: string;
    material?: string | string[];
    children?: ModelMappingUrlConfig[];
}
export interface MappedEvent extends BaseEvent {
    mappingResourceMap: Map<string, unknown>;
    configMappingMap: Map<string, unknown>;
}
export declare enum VisResourceManagerEventType {
    MAPPED = "mapped"
}
export declare class VisResourceManager extends EventDispatcher<MappedEvent> {
    private mappingResourceMap;
    private configMappingMap;
    constructor();
    mappingResource(resourceMap: Map<string, unknown>): this;
    getResource(mappingUrl: string): unknown;
    getConfig(url: string): unknown;
    dispose(): void;
}
//# sourceMappingURL=VisResourceManager.d.ts.map