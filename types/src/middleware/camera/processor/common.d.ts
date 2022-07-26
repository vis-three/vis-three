import { Camera } from "three";
import { SetSizeEvent } from "../../../engine/Engine";
export declare const cacheCameraMap: WeakMap<Camera, (event: SetSizeEvent) => void>;
