import {
  BufferGeometry,
  DodecahedronBufferGeometry,
  Material,
  Points,
  PointsMaterial,
} from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";

export interface PointsCompilerTarget
  extends SolidObjectCompilerTarget<PointsConfig> {
  [key: string]: PointsConfig;
}

export class PointsCompiler extends SolidObjectCompiler<
  PointsConfig,
  PointsCompilerTarget,
  Points
> {
  COMPILER_NAME = MODULETYPE.POINTS;

  private replaceMaterial = new PointsMaterial({ color: "rgb(150, 150, 150)" });
  private replaceGeometry = new DodecahedronBufferGeometry(5);

  constructor() {
    super();
  }

  getReplaceMaterial(): Material {
    return this.replaceMaterial;
  }

  getReplaceGeometry(): BufferGeometry {
    return this.replaceGeometry;
  }

  add(vid: string, config: PointsConfig): this {
    const object = new Points();

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
