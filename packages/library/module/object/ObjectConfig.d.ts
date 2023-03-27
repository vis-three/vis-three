import { BasicEventConfig, SymbolConfig, Vector3Config } from "@vis-three/middleware";
export interface ObjectConfig extends SymbolConfig {
    type: string;
    name: string;
    castShadow: boolean;
    receiveShadow: boolean;
    lookAt: string;
    position: Vector3Config;
    rotation: Vector3Config;
    scale: Vector3Config;
    up: Vector3Config;
    visible: boolean;
    matrixAutoUpdate: boolean;
    renderOrder: number;
    parent: string;
    children: string[];
    pointerdown: BasicEventConfig[];
    pointermove: BasicEventConfig[];
    pointerup: BasicEventConfig[];
    pointerenter: BasicEventConfig[];
    pointerleave: BasicEventConfig[];
    click: BasicEventConfig[];
    dblclick: BasicEventConfig[];
    contextmenu: BasicEventConfig[];
}
export declare const getObjectConfig: () => ObjectConfig;
