import { BufferGeometry } from "three";
/**
 * 删除几何的重复点
 * @param geometry
 * @param name
 * @returns
 */
export const AttrDeduplicate = function (
  geometry: BufferGeometry,
  name: string
) {
  const attr = geometry.getAttribute(name);
  if (!attr) {
    return [];
  }

  const points = attr.array;

  const strVects: string[] = [];

  for (let index = 0; index < points.length; index += 3) {
    strVects.push(`${points[index]}.${points[index + 1]}.${points[index + 2]}`);
  }

  const dedupVects = Array.from(new Set(strVects));

  const result: number[] = [];

  for (const str of dedupVects) {
    result.push(...str.split(".").map((str) => Number(str)));
  }

  return result;
};
