import { ParseParams, Parser, ResourceHanlder } from "./Parser";
export declare class HTMLCanvasElementParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
