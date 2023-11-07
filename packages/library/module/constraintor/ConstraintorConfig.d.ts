import { SymbolConfig } from "@vis-three/middleware";
export interface ConstraintorConfig extends SymbolConfig {
}
export interface NumberConstraintorConfig extends ConstraintorConfig {
    target: string;
    targetAttr: string;
    ref: string;
    refAttr: string;
    offset: {
        operate: string;
        value: number;
    } | null;
}
export declare const getConstraintorConfig: () => ConstraintorConfig;
export declare const getNumberConstraintorConfig: () => NumberConstraintorConfig;
