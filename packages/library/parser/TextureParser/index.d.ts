import { ParseParams, Parser, ResourceHanlder } from "@vis-three/tdcm";
export declare class TextureParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
