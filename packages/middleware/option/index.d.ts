import { DeepPartial } from "@vis-three/utils";
export interface GlobalOption {
    proxyExpand?: (c: any) => any;
    symbol: {
        generator: Function;
        validator: Function;
    };
}
export declare const globalOption: GlobalOption;
export declare const defineOption: (options: DeepPartial<GlobalOption>) => void;
