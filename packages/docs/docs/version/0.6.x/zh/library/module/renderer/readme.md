# @vis-three/module-renderer

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-renderer">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-renderer?color=blue">

## 模块信息

### module.type

- **值**: `renderer`

### module.lifeOrder

- **值**: 0

## 提供配置

### 渲染器-Renderer

- **类型**：`Renderer`
- **配置类型**:

```ts
export interface RendererConfig extends SymbolConfig {
  size: Vector2Config | null; // 为null 默认跟随canves
}
```

```ts
{
   size: null,
}
```

:::tip

- 该模块提供模块通用配置`RendererConfig`。
- 由于不同的项目需求会使用不同的渲染器插件，所以该模块的其他具体渲染器配置，请查看相关控制器插件或策略文档。
  :::
