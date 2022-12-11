import { ParseParams, Parser, ResourceHanlder } from "./Parser";
export declare class HTMLImageElementParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
