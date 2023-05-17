import { LineBasicMaterial, Object3D } from "three";

export interface VisHelper {
  target: Object3D;
  type: string;
  dispose: () => void;
}

export const getHelperLineMaterial = () =>
  new LineBasicMaterial({ color: "rgb(255, 255, 255)" });
