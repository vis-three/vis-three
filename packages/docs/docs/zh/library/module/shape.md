# @vis-three/module-shape

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-shape">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-shape?color=blue">

## 模块信息

### module.type

- **值**: `shape`

### module.object

- **值**: `false`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.ONE`-100

## 提供配置

### 形状-Shape

- **类型**：`Shape`
- **配置类型**:

```ts
export interface ShapeConfig extends SymbolConfig {
  /**路径vid标识 */
  shape: string;
  /**路径vid标识 */
  holes: string[];
}
```

- **默认配置**:

```ts
{
   shape: "",
   holes: [],
}
```
