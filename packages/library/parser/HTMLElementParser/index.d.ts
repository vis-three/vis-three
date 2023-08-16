import { ParseParams, Parser, ResourceHanlder } from "@vis-three/middleware";
export declare class HTMLElementParser extends Parser {
    private type;
    constructor(type?: "css2D" | "css3D");
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
