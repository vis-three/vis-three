# @vis-three/module-bone

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-bone">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-bone?color=blue">

## 模块信息

### module.type

- **值**: `bone`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### 骨骼-Bone

- **类型**：`Bone`
- **配置类型**:

```ts
export interface BoneConfig extends ObjectConfig {
  children: string[];
}
```

- **默认配置**:

```ts
{
   children: [],
}
```
