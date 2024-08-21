import { BufferGeometry, Vector3 } from "three";

export abstract class CurveGeometry extends BufferGeometry {
  parameters: {
    path: Vector3[];
    space: boolean;
    divisions: number;
  };

  constructor(path: Vector3[] = [], divisions = 36, space = true) {
    super();
    //@ts-ignore
    this.type = "CurveGeometry";
    this.parameters = {
      path: path.map((vector3) => vector3.clone()),
      space,
      divisions,
    };
  }
}
