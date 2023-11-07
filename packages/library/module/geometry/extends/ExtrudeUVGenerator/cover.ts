import { Box3, BufferGeometry, Vector2 } from "three";

const limit = function (number: number) {
  return number > 1 ? 1 : number < 0 ? 0 : number;
};

export const cover = {
  generateTopUV(
    geometry: BufferGeometry,
    vertices: number[],
    indexA: number,
    indexB: number,
    indexC: number
  ) {
    const a_x = vertices[indexA * 3];
    const a_y = vertices[indexA * 3 + 1];
    const b_x = vertices[indexB * 3];
    const b_y = vertices[indexB * 3 + 1];
    const c_x = vertices[indexC * 3];
    const c_y = vertices[indexC * 3 + 1];

    return [
      new Vector2(limit(a_x), limit(a_y)),
      new Vector2(limit(b_x), limit(b_y)),
      new Vector2(limit(c_x), limit(c_y)),
    ];
  },

  generateSideWallUV(
    geometry: BufferGeometry,
    vertices: number[],
    indexA: number,
    indexB: number,
    indexC: number,
    indexD: number
  ) {
    const a_x = vertices[indexA * 3];
    const a_y = vertices[indexA * 3 + 1];
    const a_z = vertices[indexA * 3 + 2];
    const b_x = vertices[indexB * 3];
    const b_y = vertices[indexB * 3 + 1];
    const b_z = vertices[indexB * 3 + 2];
    const c_x = vertices[indexC * 3];
    const c_y = vertices[indexC * 3 + 1];
    const c_z = vertices[indexC * 3 + 2];
    const d_x = vertices[indexD * 3];
    const d_y = vertices[indexD * 3 + 1];
    const d_z = vertices[indexD * 3 + 2];

    if (Math.abs(a_y - b_y) < Math.abs(a_x - b_x)) {
      return [
        new Vector2(limit(a_x), limit(1 - a_z)),
        new Vector2(limit(b_x), limit(1 - b_z)),
        new Vector2(limit(c_x), limit(1 - c_z)),
        new Vector2(limit(d_x), limit(1 - d_z)),
      ];
    } else {
      return [
        new Vector2(limit(a_y), limit(1 - a_z)),
        new Vector2(limit(b_y), limit(1 - b_z)),
        new Vector2(limit(c_y), limit(1 - c_z)),
        new Vector2(limit(d_y), limit(1 - d_z)),
      ];
    }
  },
};
