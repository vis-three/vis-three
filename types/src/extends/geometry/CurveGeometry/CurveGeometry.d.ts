import { BufferGeometry, Vector3 } from "three";
export declare abstract class CurveGeometry extends BufferGeometry {
    parameters: {
        path: Vector3[];
        space: boolean;
        divisions: number;
    };
    constructor(path?: Vector3[], divisions?: number, space?: boolean);
}
