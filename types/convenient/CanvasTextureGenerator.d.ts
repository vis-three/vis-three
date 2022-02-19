export interface CanvasTextureGeneratorParameters {
    width?: number;
    height?: number;
    bgColor?: string;
}
interface PreviewParameters {
    top: string;
    left: string;
    bottom: string;
    right: string;
}
export declare class CanvasTextureGenerator {
    canvas: HTMLCanvasElement;
    constructor(parameters?: CanvasTextureGeneratorParameters);
    get(): HTMLCanvasElement;
    draw(fun: (ctx: CanvasRenderingContext2D) => void): this;
    preview(parameters?: PreviewParameters): this;
}
export {};
