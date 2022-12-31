import { Texture } from "three";
export interface TextureDisplayerParameters {
    dom?: HTMLElement;
    texture?: Texture;
}
export declare class TextureDisplayer {
    static ambientLight: any;
    private dom?;
    private texture?;
    private renderer;
    private scene;
    private camera;
    constructor(parameters?: TextureDisplayerParameters);
    setTexture(texture: Texture): this;
    setDom(dom: HTMLElement): this;
    setSize(width?: number, height?: number): this;
    render(): void;
    /**
     * 导出图片dataURL
     * @param mine 图片格式
     * @returns DataURL
     */
    getDataURL(mine: string): any;
    dispose(): void;
}
