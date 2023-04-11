import { BufferGeometry, Path } from "three";
export declare class PathGeometry extends BufferGeometry {
    parameters: {
        path: Path;
        space: boolean;
        divisions: number;
    };
    constructor(path?: Path, divisions?: number, space?: boolean);
}
