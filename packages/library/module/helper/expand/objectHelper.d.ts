import { SymbolConfig } from "@vis-three/middleware";
export declare const getHelperExpandConfig: <C extends SymbolConfig>(config: C) => C & {
    helper: string;
};
export declare const expandCommand: {
    add: {
        helper(): void;
    };
    set: {
        helper(): void;
    };
};
