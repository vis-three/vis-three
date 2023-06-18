# @vis-three/module-line

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-line">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-line?color=blue">

## 模块信息

### module.type

- **值**: `line`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### 线物体-Line

- **类型**：`Line`
- **配置类型**:

```ts
export interface LineConfig extends SolidObjectConfig {
  /**材质vid标识 */
  material: string;
  /**几何vid标识 */
  geometry: string;
  /**是否为虚线，如果当前的使用材质是`LineDashedMaterial`请打开 */
  dashed: boolean;
}
```

- **默认配置**：

```ts
{
    geometry: "",
    material: "",
    dashed: false,
  }
```
