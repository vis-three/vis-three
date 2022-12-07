import { Camera } from "three";
import { SetSizeEvent } from "../../../engine/Engine";

export const cacheCameraMap = new WeakMap<
  Camera,
  (event: SetSizeEvent) => void
>();

