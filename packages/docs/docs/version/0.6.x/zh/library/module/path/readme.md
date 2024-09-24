# @vis-three/module-path

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-path">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-path?color=blue">

## 模块信息

### module.type

- **值**: `path`

### module.object

- **值**: `false`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.ZERO`-0

## 提供配置

### 路径-Path

- **类型**：`Path`
- **配置类型**:

```ts
export type LineSegmentConfig = [number, number, number, number];

export type ArcSegmentConfig = [
  number,
  number,
  number,
  boolean,
  number,
  number
];

export type bezierSegmentConfig = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export type quadraticSegmentConfig = [
  number,
  number,
  number,
  number,
  number,
  number
];

export interface SegmentConfig {
  /**路径名称：line, arc,  bezier, quadratic*/
  curve: string;
  params:
    | LineSegmentConfig
    | ArcSegmentConfig
    | bezierSegmentConfig
    | quadraticSegmentConfig;
}

export interface PathConfig extends SymbolConfig {
  curves: SegmentConfig[];
  /**自动闭合路径，会在头尾之间添加一条直线line */
  autoClose: boolean;
}
```

- **默认配置**:

```ts
{
   curves: [],
   autoClose: false,
}
```

:::tip
路径配置修改一个曲线`params`中的值，会影响这个曲线前后曲线的值（如果有的话），目的是让曲线之间始终保持首尾连贯。
:::
