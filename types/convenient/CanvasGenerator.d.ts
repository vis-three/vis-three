/**
 * @deprecated CanvasTextureGeneratorParameters rename to CanvasGeneratorParameters
 */
export interface CanvasTextureGeneratorParameters {
    width?: number;
    height?: number;
    bgColor?: string;
}
export interface CanvasGeneratorParameters {
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
/**
 * @deprecated CanvasTextureGenerator rename to CanvasGenerator
 */
export declare class CanvasTextureGenerator {
    canvas: HTMLCanvasElement;
    constructor(parameters?: CanvasTextureGeneratorParameters);
    get(): HTMLCanvasElement;
    draw(fun: (ctx: CanvasRenderingContext2D) => void): this;
    preview(parameters?: PreviewParameters): this;
}
export declare class CanvasGenerator {
    canvas: HTMLCanvasElement;
    constructor(parameters?: CanvasGeneratorParameters);
    get(): HTMLCanvasElement;
    clear(x?: number, y?: number, width?: number, height?: number): this;
    draw(fun: (ctx: CanvasRenderingContext2D) => void): this;
    preview(parameters?: PreviewParameters): this;
}
export {};
