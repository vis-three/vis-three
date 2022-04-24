import {
  BoxBufferGeometry,
  BufferGeometry,
  Material,
  Mesh,
  MeshBasicMaterial,
} from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerParameters,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { MeshConfig } from "./MeshConfig";

export interface MeshCompilerTarget
  extends SolidObjectCompilerTarget<MeshConfig> {
  [key: string]: MeshConfig;
}

export type MeshCompilerParameters = SolidObjectCompilerParameters<
  MeshConfig,
  MeshCompilerTarget
>;

export class MeshCompiler extends SolidObjectCompiler<
  MeshConfig,
  MeshCompilerTarget,
  Mesh
> {
  COMPILER_NAME: string = MODULETYPE.MESH;

  private replaceMaterial = new MeshBasicMaterial({
    color: "rgb(150, 150, 150)",
  });
  private replaceGeometry = new BoxBufferGeometry(10, 10, 10);

  constructor(parameters?: MeshCompilerParameters) {
    super(parameters);
  }

  getReplaceMaterial(): Material {
    return this.replaceMaterial;
  }

  getReplaceGeometry(): BufferGeometry {
    return this.replaceGeometry;
  }

  add(vid: string, config: MeshConfig): this {
    const object = new Mesh();

    this.map.set(vid, object);
    this.weakMap.set(object, vid);

    super.add(vid, config);
    return this;
  }

  dispose(): this {
    super.dispose();
    this.replaceGeometry.dispose();
    this.replaceMaterial.dispose();
    return this;
  }
}
