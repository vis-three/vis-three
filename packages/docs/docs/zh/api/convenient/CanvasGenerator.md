# canvas 生成器

通过此类快生成`canvas`并可管理，可修改。

## 构造

- **详情**

```ts
/**该构造会自动根据设备的像素比例计算调整整个画布比例。 */
constructor CanvasGenerator(parameters?: CanvasGeneratorParameters): CanvasGenerator

export interface CanvasGeneratorParameters {
  /**画布宽 */
  width?: number;
  /**画布高 */
  height?: number;
  /**画布的背景色 */
  bgColor?: string;
}
```

## 属性

### canvas

生成的`canvas`对象。

- **类型**

```ts
HTMLCanvasElement;
```

## 方法

### getDom

- **详情**

```ts
/**
 * 获取canvas dom
 * @returns HTMLCanvasElement
 */
getDom(): HTMLCanvasElement
```

### clear

- **详情**

```ts
  /**
   * 清空画布，不传参默认全部清除
   * @param x position x px
   * @param y  position z px
   * @param width width px
   * @param height height px
   * @returns this
   */
clear(x?: number, y?: number, width?: number, height?: number): this
```

### draw

- **详情**

```ts
/**
 * canvas绘制
 * @param fun callback(ctx)
 * @returns this
 */
draw(fun: (ctx: CanvasRenderingContext2D) => void): this
```

### preview

- **详情**

```ts
/**
 * canvas预览
 * @param parameters style position
 * @returns this
 */
preview(parameters?: PreviewParameters): this

interface PreviewParameters {
  top?: string;
  left?: string;
  bottom?: string;
  right?: string;
  scale?: string;
}
```

### setSize

- **详情**

```ts
/**
 * 设置canvas画布大小
 * @param width
 * @param height
 * @returns
 */
setSize(width: number, height: number): this
```
