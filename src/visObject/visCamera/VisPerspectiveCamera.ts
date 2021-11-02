import { PerspectiveCamera } from "three";
import { VisObject3DAttribute } from "../VisObject";
import {VisCameraAttribute } from './VisCamera'
import { v4 as getUUid } from "uuid";

export class VisPerspectiveCamera extends PerspectiveCamera implements VisCameraAttribute, VisObject3DAttribute{
  
  vid: string

  constructor(fov?: number, aspect?: number, near?: number, far?: number) {
    super(fov, aspect, near, far)
    this.vid = getUUid()
  }

  setSize (width: number, height:number): void {
    this.aspect = width / height
    this.updateProjectionMatrix()
  }
}