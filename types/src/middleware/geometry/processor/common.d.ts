import { BufferGeometry } from "three";
import { ProcessorCommands } from "../../../core/Processor";
import { GeometryConfig } from "../GeometryInterface";
export declare const transfromAnchor: <T extends BufferGeometry, C extends GeometryConfig>(geometry: T, config: C) => T;
export declare const commands: ProcessorCommands<GeometryConfig, BufferGeometry>;
export declare const create: <T extends BufferGeometry, C extends GeometryConfig>(target: T, config: C) => T;
