import { BufferGeometry } from "three";
/**
 * 删除几何的重复点
 * @param geometry
 * @param name
 * @returns
 */
export declare const AttrDeduplicate: (geometry: BufferGeometry, name: string) => number[];
