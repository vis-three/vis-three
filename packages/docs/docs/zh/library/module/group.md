# @vis-three/module-group

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-group">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-group?color=blue">

## 模块信息

### module.type

- **值**: `group`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### 组-Group

- **类型**：`Group`
- **配置类型**:

```ts
export interface GroupConfig extends ObjectConfig {
  children: string[];
}
```

- **默认配置**:

```ts
{
   children: [],
}
```
