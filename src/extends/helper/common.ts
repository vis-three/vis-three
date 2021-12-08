import { LineBasicMaterial, Object3D } from "three";

export const HELPERCOLOR = 'rgb(255, 255, 255)'

export const getHelperLineMaterial = () => new LineBasicMaterial({ color: HELPERCOLOR })

export interface VisHelper {
  target: Object3D
  type: string
}