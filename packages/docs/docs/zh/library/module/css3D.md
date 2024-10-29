# @vis-three/module-css3D

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-css3d">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-css3d?color=blue">

## 模块信息

### module.type

- **值**: `css3D`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### CSS3D 物体-CSS3DObject

- **类型**：`CSS3DObject`
- **配置类型**:

```ts
export interface CSS3DObjectConfig extends ObjectConfig {
  element: string; // 外部资源resourceManagerPlugin解析
  width: number;
  height: number;
}
```

- **默认配置**:

```ts
{
   element: "",
   width: 50,
   height: 50,
}
```

:::tip
该配置供模块内部使用
:::

### CSS3D 平面-CSS3DPlane

- **类型**：`CSS3DPlane`
- **配置类型**:

```ts
export interface CSS3DPlaneConfig extends CSS3DObjectConfig {}
```

- **默认配置**:

```ts
{
   element: "",
   width: 50,
   height: 50,
}
```

### CSS3D 精灵-CSS3DSprite

- **类型**：`CSS3DSprite`
- **配置类型**:

```ts
export interface CSS3DSpriteConfig extends CSS3DObjectConfig {
  /**旋转角度 */
  rotation2D: number;
}
```

- **默认配置**:

```ts
{
    rotation2D: 0,
  }
```
