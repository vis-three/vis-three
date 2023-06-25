# @vis-three/module-sprite

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-sprite">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-sprite?color=blue">

## 模块信息

### module.type

- **值**: `sprite`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### 精灵-Group

- **类型**：`Sprite`
- **配置类型**:

```ts
export interface SpriteConfig extends SolidObjectConfig {
  material: string;
  center: Vector2Config;
}
```

- **默认配置**:

```ts
{
    material: "",
    center: {
      x: 0.5,
      y: 0.5,
    },
  }
```
