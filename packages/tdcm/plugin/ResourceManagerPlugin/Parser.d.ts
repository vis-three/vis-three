import { BasicConfig } from "../../module/common";
export interface ParseParams {
    url: string;
    resource: any;
    configMap: Map<string, BasicConfig>;
    resourceMap: Map<string, any>;
}
export type ResourceHanlder = (url: string, resource: any, parseMap: Map<Function, Parser>) => Parser | null;
export declare abstract class Parser {
    /**资源选择器，通过怎么样的方式选择这个资源交给这个解析器解析 */
    abstract selector: ResourceHanlder;
    /**解析方法 */
    abstract parse(params: ParseParams): void;
}
export declare class DefaultParser extends Parser {
    selector: ResourceHanlder;
    parse({ url, resource, configMap, resourceMap }: ParseParams): void;
}
