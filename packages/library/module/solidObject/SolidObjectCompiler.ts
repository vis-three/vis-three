import { ObjectCompiler } from "@vis-three/module-object";
import { Event, Mesh, Object3D } from "three";
import { SolidObjectConfig } from "./SolidObjectConfig";

export interface SolidObject3D extends Object3D<Event> {
  material: Mesh["material"];
  geometry: Mesh["geometry"];
}

export type BasicSolidObjectCompiler = SolidObjectCompiler<
  SolidObjectConfig,
  SolidObject3D
>;
export abstract class SolidObjectCompiler<
  C extends SolidObjectConfig,
  O extends SolidObject3D
> extends ObjectCompiler<C, O> {
  constructor() {
    super();
  }
}
