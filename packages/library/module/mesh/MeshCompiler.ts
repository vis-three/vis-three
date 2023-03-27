import { SolidObjectCompiler } from "@vis-three/module-solid-object";
import { Mesh } from "three";
import { MeshConfig } from "./MeshConfig";

export class MeshCompiler extends SolidObjectCompiler<MeshConfig, Mesh> {
  constructor() {
    super();
  }
}
