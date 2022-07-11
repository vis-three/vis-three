import { BufferGeometry } from "three";
import { CONFIGTYPE } from "../constants/configType";
import { GeometryCompiler } from "./GeometryCompiler";
declare const map: Map<CONFIGTYPE, (config: any, compiler: GeometryCompiler) => BufferGeometry>;
export default map;
