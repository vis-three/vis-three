# @vis-three/module-points

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-points">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-points?color=blue">

## 模块信息

### module.type

- **值**: `points`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE`-300

## 提供配置

### 路径-Path

- **类型**：`Path`
- **配置类型**:

```ts
export interface PointsConfig extends SolidObjectConfig {
  geometry: string;
  material: string;
}
```

- **默认配置**:

```ts
{
   geometry: "",
   material: "",
}
```
