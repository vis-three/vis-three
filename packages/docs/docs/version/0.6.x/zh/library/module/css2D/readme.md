# @vis-three/module-css2D

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-css2d">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-css2d?color=blue">

## 模块信息

### module.type

- **值**: `css2D`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### CSS2D 物体-CSS2DObject

- **类型**：`CSS2DObject`
- **配置类型**:

```ts
export interface CSS2DObjectConfig extends ObjectConfig {
  element: string;
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

### CSS2D 平面-CSS2DPlane

- **类型**：`CSS2DPlane`
- **配置类型**:

```ts
export interface CSS2DPlaneConfig extends CSS2DObjectConfig {}
```

- **默认配置**:

```ts
{
   element: "",
   width: 50,
   height: 50,
}
```
