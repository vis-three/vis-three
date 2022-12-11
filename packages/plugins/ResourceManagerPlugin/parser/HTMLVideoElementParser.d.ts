import { ParseParams, Parser, ResourceHanlder } from "./Parser";
export declare class HTMLVideoElementParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
