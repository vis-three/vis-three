import { ParseParams, Parser, ResourceHanlder } from "@vis-three/tdcm";
export declare class HTMLImageElementParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
