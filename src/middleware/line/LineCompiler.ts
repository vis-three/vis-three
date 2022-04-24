import {
  BoxBufferGeometry,
  BufferGeometry,
  Line,
  LineBasicMaterial,
  Material,
} from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import {
  SolidObjectCompiler,
  SolidObjectCompilerTarget,
} from "../solidObject/SolidObjectCompiler";
import { LineConfig } from "./LineConfig";

export interface LineCompilerTarget
  extends SolidObjectCompilerTarget<LineConfig> {
  [key: string]: LineConfig;
}

export class LineCompiler extends SolidObjectCompiler<
  LineConfig,
  LineCompilerTarget,
  Line
> {
  COMPILER_NAME: string = MODULETYPE.LINE;

  private replaceMaterial = new LineBasicMaterial({
    color: "rgb(150, 150, 150)",
  });
  private replaceGeometry = new BoxBufferGeometry(10, 10, 10);

  constructor() {
    super();
  }

  getReplaceMaterial(): Material {
    return this.replaceMaterial;
  }

  getReplaceGeometry(): BufferGeometry {
    return this.replaceGeometry;
  }

  add(vid: string, config: LineConfig): this {
    const object = new Line();

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
