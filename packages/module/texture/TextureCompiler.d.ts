import { Texture } from "three";
import { TextureAllType } from "./TextureConfig";
import { Compiler } from "@vis-three/middleware";
export declare class TextureCompiler extends Compiler<TextureAllType, Texture> {
    static replaceImage: HTMLCanvasElement;
    constructor();
    getResource<T extends abstract new (...args: any) => any>(url: string, instanceClasses: T | T[]): InstanceType<T> | HTMLCanvasElement;
}
