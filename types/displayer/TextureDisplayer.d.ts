import { AmbientLight, Texture } from "three";
export interface TextureDisplayerParameters {
    dom?: HTMLElement;
    texture?: Texture;
}
export declare class TextureDisplayer {
    static ambientLight: AmbientLight;
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
    dispose(): void;
}
