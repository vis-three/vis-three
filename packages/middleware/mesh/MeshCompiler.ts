import { Mesh } from "three";
import { SolidObjectCompiler } from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";

export class MeshCompiler extends SolidObjectCompiler<MeshConfig, Mesh> {

  constructor() {
    super();
  }
}