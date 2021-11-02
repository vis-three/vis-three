import { OrthographicCamera } from "three";
import {VisCameraAttribute } from './VisCamera'
import { v4 as getUUid } from "uuid";
import { VisObject3DAttribute } from "../VisObject";

export class VisOrthographicCamera extends OrthographicCamera implements VisCameraAttribute, VisObject3DAttribute {
  vid: string

  constructor(left: number, right: number, top: number, bottom: number, near?: number, far?: number) {
    super(left, right, top, bottom, near, far)
    this.vid = getUUid()
  }

  setSize (width: number, height:number): void {
    this.left = -width / 16
    this.right = width / 16
    this.top = height / 16
    this.bottom = -height / 16
    this.updateProjectionMatrix()
  }
}