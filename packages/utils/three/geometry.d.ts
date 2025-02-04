import { BufferGeometry } from "three";
/**
 * 删除几何的重复点
 * @param geometry 几何
 * @param name 几何属性
 * @returns number[]
 */
export declare const AttrDeduplicate: (geometry: BufferGeometry, name: string) => number[];
