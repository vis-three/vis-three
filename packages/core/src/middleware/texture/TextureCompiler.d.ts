import { Texture } from "three";
import { Compiler } from "../../core/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { TextureAllType } from "./TextureConfig";
export declare class TextureCompiler extends Compiler<TextureAllType, Texture> {
    static replaceImage: HTMLCanvasElement;
    MODULE: MODULETYPE;
    constructor();
    getResource<T extends abstract new (...args: any) => any>(url: string, instanceClasses: T | T[]): InstanceType<T> | HTMLCanvasElement;
}
