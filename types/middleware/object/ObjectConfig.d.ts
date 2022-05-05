import { BasicEventConfig } from "../../library/event/EventLibrary";
import { Vector3Config, SymbolConfig } from "../common/CommonConfig";
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
