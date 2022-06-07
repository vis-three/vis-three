import { BufferGeometry, Vector3 } from "three";

export class CurveGeometry extends BufferGeometry {
  parameters: {
    path: Vector3[];
    space: boolean;
    divisions: number;
  };

  constructor(path: Vector3[], divisions = 36, space = true) {
    super();

    this.type = "CurveGeometry";
    this.parameters = {
      path: path.map((vector3) => vector3.clone()),
      space,
      divisions,
    };
  }
}
