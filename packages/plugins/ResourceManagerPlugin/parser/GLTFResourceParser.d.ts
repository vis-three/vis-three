import { ParseParams, Parser, ResourceHanlder } from "./Parser";
export declare class GLTFResourceParser extends Parser {
    private object3DParser;
    constructor();
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
