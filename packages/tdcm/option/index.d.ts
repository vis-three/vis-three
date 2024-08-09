import { DeepPartial } from "@vis-three/utils";
import { EngineSupport } from "../engine";
export interface GlobalOption {
    proxy: {
        expand?: (c: any) => any;
        timing: "before" | "after";
        toRaw?: (c: any) => any;
    };
    symbol: {
        generator: Function;
        validator: (id: string) => boolean;
    };
    engine?: EngineSupport;
}
export declare const globalOption: GlobalOption;
export declare const defineOption: (options: DeepPartial<GlobalOption>) => void;
