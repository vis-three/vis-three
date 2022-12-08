import { SymbolConfig } from "../middleware/common/CommonConfig";
export interface ParseParams {
    url: string;
    resource: any;
    configMap: Map<string, SymbolConfig>;
    resourceMap: Map<string, any>;
}
export type ResourceHanlder = (url: string, resource: any, parseMap: Map<Function, Parser>) => Parser | null;
export declare abstract class Parser {
    abstract selector: ResourceHanlder;
    abstract parse(params: ParseParams): void;
}
