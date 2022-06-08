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
  scale?: string;
}

export class CanvasGenerator {
  canvas: HTMLCanvasElement;

  constructor(parameters?: CanvasGeneratorParameters) {
    this.canvas = document.createElement("canvas");
    const devicePixelRatio = window.devicePixelRatio;
    this.canvas.width = (parameters?.width || 512) * devicePixelRatio;
    this.canvas.height = (parameters?.height || 512) * devicePixelRatio;
    this.canvas.style.backgroundColor =
      parameters?.bgColor || "rgb(255, 255, 255)";
  }

  /**
   * 获取canvas dom
   * @returns HTMLCanvasElement
   */
  get(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * 清空画布
   * @param x position x px
   * @param y  position z px
   * @param width width px
   * @param height height px
   * @returns this
   */
  clear(x = 0, y = 0, width?: number, height?: number): this {
    !width && (width = this.canvas.width);
    !height && (height = this.canvas.height);
    const ctx = this.canvas.getContext("2d");

    if (ctx) {
      ctx.clearRect(x, y, width, height);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }

  /**
   * canvas绘制
   * @param fun callback(ctx)
   * @returns this
   */
  draw(fun: (ctx: CanvasRenderingContext2D) => void): this {
    const ctx = this.canvas.getContext("2d");

    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      fun(ctx);
      return this;
    } else {
      console.warn(`you browser can not support canvas 2d`);
      return this;
    }
  }

  /**
   * canvas预览
   * @param parameters style position
   * @returns this
   */
  preview(parameters?: PreviewParameters): this {
    const canvas = this.canvas;
    canvas.style.position = "fixed";
    canvas.style.top = parameters?.top || "5%";
    canvas.style.left = parameters?.left || "5%";
    canvas.style.right = parameters?.right || "unset";
    canvas.style.bottom = parameters?.bottom || "unset";

    if (parameters?.scale) {
      canvas.style.transform = `scale(${parameters.scale})`;
    }

    document.body.appendChild(this.canvas);
    return this;
  }
}
