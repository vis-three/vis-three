import { SymbolConfig } from "@vis-three/middleware";
export interface ShapeConfig extends SymbolConfig {
    shape: string;
    holes: string[];
}
export declare const getShapeConfig: () => ShapeConfig;
