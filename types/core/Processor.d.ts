import { SymbolConfig } from "../middleware/common/CommonConfig";
export interface Process {
    key: string;
    path: string[];
    value: any;
}
export declare abstract class Processor {
    abstract target?: any;
    abstract config?: SymbolConfig;
    filterMap: {
        [key: string]: boolean;
    };
    protected assembly: boolean;
    constructor();
    protected mergeAttribute(path: string[], key: string, value: any): void;
    protected mergeObject(callBack?: Function): void;
    processAll(): this;
    abstract assemble(params: any): this;
    abstract process(params: Process): this;
    abstract dispose(): this;
}
