import { ParseParams, Parser, ResourceHanlder } from "@vis-three/middleware";
export declare class GLTFResourceParser extends Parser {
    private object3DParser;
    constructor();
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
