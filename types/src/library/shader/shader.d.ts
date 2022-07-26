import { IUniform } from "three";
export interface Shader {
    name: string;
    defines?: {
        [key: string]: any;
    };
    uniforms?: {
        [uniform: string]: IUniform;
    };
    vertexShader?: string;
    fragmentShader?: string;
}
