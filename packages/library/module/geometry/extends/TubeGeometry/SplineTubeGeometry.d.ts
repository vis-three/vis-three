import { TubeGeometry, Vector3 } from "three";
export declare class SplineTubeGeometry extends TubeGeometry {
    constructor(path?: Vector3[], tubularSegments?: number, radius?: number, radialSegments?: number, closed?: boolean);
}
