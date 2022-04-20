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
    top?: string;
    left?: string;
    bottom?: string;
    right?: string;
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
    /**
     * 获取canvas dom
     * @returns HTMLCanvasElement
     */
    get(): HTMLCanvasElement;
    /**
     * 清空画布
     * @param x position x px
     * @param y  position z px
     * @param width width px
     * @param height height px
     * @returns this
     */
    clear(x?: number, y?: number, width?: number, height?: number): this;
    /**
     * canvas绘制
     * @param fun callback(ctx)
     * @returns this
     */
    draw(fun: (ctx: CanvasRenderingContext2D) => void): this;
    /**
     * canvas预览
     * @param parameters style position
     * @returns this
     */
    preview(parameters?: PreviewParameters): this;
}
export {};
