import { IUniform } from "three";
import { ShaderLibrary } from "./ShaderLibrary";

export interface Shader {
  name: string;
  uniforms?: { [uniform: string]: IUniform };
  vertexShader?: string;
  FragmentShader?: string;
}

export const defaultShader = {
  name: "defaultShader",
};

ShaderLibrary.reigster(defaultShader);
