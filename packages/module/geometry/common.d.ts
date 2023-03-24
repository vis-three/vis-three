import { EngineSupport, ProcessorCommands } from "@vis-three/middleware";
import { BufferGeometry } from "three";
import { GeometryCompiler } from "./GeometryCompiler";
import { GeometryConfig } from "./GeometryInterface";
export declare const transfromAnchor: <T extends BufferGeometry, C extends GeometryConfig>(geometry: T, config: C) => T;
export declare const commands: ProcessorCommands<GeometryConfig, BufferGeometry, EngineSupport, GeometryCompiler>;
export declare const create: <T extends BufferGeometry, C extends GeometryConfig>(target: T, config: C) => T;
export declare const dispose: (target: BufferGeometry) => void;
