# @vis-three/module-mesh

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-mesh">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-mesh?color=blue">

## 模块信息

### module.type

- **值**: `mesh`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### 网格物体-Mesh

- **类型**：`Mesh`
- **配置类型**:

```ts
export interface MeshConfig extends SolidObjectConfig {
  material: string | string[];
}
```

- **默认配置**:

```ts
{
   geometry: "",
   material: "",
}
```
