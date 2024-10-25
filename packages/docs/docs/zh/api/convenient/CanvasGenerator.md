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

## 方法

### get

### getDom

### clear

### draw

### preview

### setSize
