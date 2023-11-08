import { SymbolConfig } from "@vis-three/middleware";
export interface ConstraintorConfig extends SymbolConfig {
    target: string;
}
export interface NumberConstraintorConfig extends ConstraintorConfig {
    targetAttr: string;
    ref: string;
    refAttr: string;
    offset: {
        operate: string;
        value: number;
    } | null;
}
export interface BoundingBoxConstraintorConfig extends ConstraintorConfig {
    targetAttr: string;
    ref: string;
    space: string;
    offset: {
        position: {
            direction: string;
            axes: string;
        };
        operate: string;
        value: number;
    };
}
export declare const getConstraintorConfig: () => ConstraintorConfig;
export declare const getNumberConstraintorConfig: () => NumberConstraintorConfig;
export declare const getBoundingBoxConstraintorConfig: () => BoundingBoxConstraintorConfig;
