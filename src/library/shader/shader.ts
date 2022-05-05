import { IUniform } from "three";
export interface Shader {
  name: string;
  uniforms?: { [uniform: string]: IUniform };
  vertexShader?: string;
  FragmentShader?: string;
}
