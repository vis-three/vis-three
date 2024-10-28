# 材质展示器

可以展示各种材质效果，输出图像。

## 构造

- **详情**

```ts
constructor MaterialDisplayer(parameters?: MaterialDisplayerParameters): MaterialDisplayer

export interface MaterialDisplayerParameters {
  /**展示的目标dom */
  dom?: HTMLElement;
  /**展示的材质 */
  material?: Material;
}
```

## 属性

### material

所展示的材质。

- **类型**

```ts
Material;
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

### object

展示器的渲染材质的目标物体。

- **类型**

```ts
Object3D;
```

## 方法

### setMaterial

- **详情**

```ts
/**
 * 设置展示材质
 * @param material 要展示的材质
 * @returns this
 */
setMaterial(material: Material): this
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
