# @vis-three/module-pass

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-pass">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-pass?color=blue">

## 模块信息

使用此模块需要提前安装后期插件与支持策略。

- @vis-three/plugin-effect-composer
- @vis-three/strategy-composer-support

### module.type

- **值**: `pass`

### module.object

- **值**: `false`

### module.lifeOrder

- **值**: 0

## 提供配置

### 过程链-Pass

- **类型**：`Pass`
- **配置类型**:

```ts
export interface PassConfig extends SymbolConfig {
  index: number;
}
```

- **默认配置**:

```ts
{
  index: 0;
}
```

:::tip
此配置为内部调用。
:::

### 子像素增强抗锯齿过程链-SMAAPass

- **类型**：`SMAAPass`
- **配置类型**:

```ts
export interface SMAAPassConfig extends PassConfig {}
```

- **默认配置**:

```ts
{
}
```

### 虚幻光影过程链-UnrealBloomPass

- **类型**：`UnrealBloomPass`
- **配置类型**:

```ts
export interface UnrealBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
}
```

- **默认配置**:

```ts
{
   strength: 1.5,
   threshold: 0,
   radius: 0,
}
```

### 选择发光过程链-SelectiveBloomPass

- **类型**：`SelectiveBloomPass`
- **配置类型**:

```ts
export interface SelectiveBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
  /**渲染场景 vid */
  renderScene: string;
  /**渲染相机 vid */
  renderCamera: string;
  /**发光物体 vid list */
  selectedObjects: string[];
}
```

- **默认配置**:

```ts
 {
   strength: 1,
   threshold: 0,
   radius: 0,
   renderScene: "",
   renderCamera: "",
   selectedObjects: [],
}
```

### 屏幕空间环境光遮蔽过程链-SSAOPass

- **类型**：`SSAOPass`
- **配置类型**:

```ts
export interface SSAOPassConfig extends PassConfig {
  /**目标相机 vid */
  camera: string;
  /**目标场景 vid */
  scene: string;
  kernelRadius: number;
  kernelSize: number;
  noiseTexture: string;
  output: number;
  minDistance: number;
  maxDistance: number;
}
```

- **默认配置**:

```ts
{
   camera: "",
   scene: "",
   kernelRadius: 8,
   kernelSize: 32,
   noiseTexture: "",
   output: 0,
   minDistance: 0.005,
   maxDistance: 0.1,
}
```
