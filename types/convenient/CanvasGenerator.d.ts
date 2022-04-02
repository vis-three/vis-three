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
    draw(fun: (ctx: CanvasRenderingContext2D) => void): this;
    preview(parameters?: PreviewParameters): this;
}
export {};
