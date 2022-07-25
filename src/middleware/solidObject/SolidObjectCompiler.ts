import { Event, Mesh, Object3D } from "three";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export interface SolidObject3D extends Object3D<Event> {
  material: Mesh["material"];
  geometry: Mesh["geometry"];
}

export type BasicSolidObjectCompiler = SolidObjectCompiler<
  SolidObjectConfig,
  SolidObjectCompilerTarget<SolidObjectConfig>,
  SolidObject3D
>;

export interface SolidObjectCompilerTarget<C extends SolidObjectConfig>
  extends ObjectCompilerTarget<C> {
  [key: string]: C;
}

export abstract class SolidObjectCompiler<
  C extends SolidObjectConfig,
  T extends SolidObjectCompilerTarget<C>,
  O extends SolidObject3D
> extends ObjectCompiler<C, T, O> {
  IS_SOLIDOBJECTCOMPILER = true;

  constructor() {
    super();
  }
}
