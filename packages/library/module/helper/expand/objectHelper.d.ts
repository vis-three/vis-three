import { SymbolConfig } from "@vis-three/middleware";
export declare const getHelperExpandConfig: <C extends SymbolConfig>(config: C) => C & {
    helper: string;
};
