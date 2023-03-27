import { ParseParams, Parser, ResourceHanlder } from "@vis-three/middleware";
export declare class HTMLImageElementParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
