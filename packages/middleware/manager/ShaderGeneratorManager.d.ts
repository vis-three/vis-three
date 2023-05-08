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
export declare class ShaderGeneratorManager {
    private static library;
    /**
     * 注册着色器文件
     * @param shader
     */
    static register: (shader: Shader) => void;
    /**
     * 获取着色器文件
     * @param name 文件名
     * @returns shader | null
     */
    static getShader(name: string): Shader | null;
    /**
     * 获取该着色器文件对应的配置
     * @param name
     * @returns
     */
    static generateConfig(name: string): {
        [key: string]: any;
    };
    /**
     * 克隆着色器
     * @param shader
     * @returns
     */
    static cloneShader(shader: Shader): Shader;
}
