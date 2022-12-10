import { SetSizeEvent } from "@vis-three/core";
import { Camera } from "three";

export const cacheCameraMap = new WeakMap<
  Camera,
  (event: SetSizeEvent) => void
>();

