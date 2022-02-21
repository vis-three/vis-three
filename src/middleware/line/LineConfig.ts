import { Vector3Config } from "../common/CommonConfig";
import { getObjectConfig, ObjectConfig } from "../object/ObjectConfig";

export interface LineConfig extends ObjectConfig {
  material: string
  points: (Vector3Config| string)[]
}

export interface Line2Config extends LineConfig {

}

export interface LineSegmentsConfig extends ObjectConfig {
  material: string
  pairPoints: Array<(Vector3Config| string)[]>
}

export interface LineSegments2Config extends LineSegmentsConfig {

}

export type LineAllType = LineSegmentsConfig

export const getLineSegmentsConfig = function(): LineSegmentsConfig {
  return Object.assign(getObjectConfig(), {
    type: 'LineSegments',
    pairPoints: [],
    material: ''
  })
}