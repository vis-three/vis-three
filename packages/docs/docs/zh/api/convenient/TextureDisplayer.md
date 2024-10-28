# 贴图展示器

暂时各种各样的贴图效果，输出图像。

## 构造

- **详情**

```ts
constructor TextureDisplayer(parameters?: TextureDisplayerParameters): TextureDisplayer

export interface TextureDisplayerParameters {
  /**展示的目标dom */
  dom?: HTMLElement;
  /**展示的贴图 */
  texture?: Texture;
}
```

## 属性

### texture

所展示的贴图。

- **类型**

```ts
Texture;
```

### dom

展示到的目标 dom。

- **类型**

```ts
HTMLElement;
```

### renderer

当前展示器的渲染器。

- **类型**

```ts
WebGLRenderer;
```

### scene

展示器的渲染场景。

- **类型**

```ts
Scene;
```

### camera

展示器的渲染相机。

- **类型**

```ts
PerspectiveCamera;
```

## 方法

### setTexture

- **详情**

```ts
/**
 * 设置展示的贴图
 * @param texture 贴图
 * @returns this
 */
setTexture(texture: Texture): this
```

### setDom

- **详情**

```ts
/**
 * 设置渲染的目标dom
 * @param dom
 * @returns this
 */
setDom(dom: HTMLElement): this
```

### setSize

- **详情**

```ts
/**
 * 设置整个展示器的尺寸，不传参默认目标dom大小
 * @param width
 * @param height
 * @returns this
 */
setSize(width?: number, height?: number): this
```

### render

- **详情**

```ts
/**
 * 渲染展示器
 */
render(): void
```

### getDataURL

- **详情**

```ts
/**
 * 导出图片dataURL
 * @param mine 图片格式
 * @returns DataURL
 */
getDataURL(mine: string): string
```

### dispose

- **详情**

```ts
/**
 * 销毁当前展示器的内存
 */
dispose(): void
```
