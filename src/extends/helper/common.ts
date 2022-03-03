import { LineBasicMaterial, Object3D } from "three";
import { HELPERCOLOR } from "../../middleware/constants/COLOR";

export const getHelperLineMaterial = () => new LineBasicMaterial({ color: HELPERCOLOR })
export interface VisHelper {
  target: Object3D
  type: string
}