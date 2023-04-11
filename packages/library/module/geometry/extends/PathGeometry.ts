import { BufferGeometry, Path } from "three";

export class PathGeometry extends BufferGeometry {
  parameters: {
    path: Path;
    space: boolean;
    divisions: number;
  };

  constructor(path: Path = new Path(), divisions = 36, space = true) {
    super();

    this.type = "PathGeometry";
    this.parameters = {
      path,
      space,
      divisions,
    };

    path.curves.length &&
      this.setFromPoints(
        space ? path.getSpacedPoints(divisions) : path.getPoints(divisions)
      );
  }
}
