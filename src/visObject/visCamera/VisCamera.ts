import { Camera } from "three";
import { VisObject3D } from "../VisObject";

export interface VisCameraAttribute {
  setSize (width: number, height: number): void
}

export type VisCamera = Camera & VisCameraAttribute & VisObject3D