# @vis-three/module-pass

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-pass">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-pass?color=blue">

## Module Information

This module requires the following plugins and support strategies to be installed in advance:

- @vis-three/plugin-effect-composer
- @vis-three/strategy-composer-support

### module.type

- **Value**: `pass`

### module.object

- **Value**: `false`

### module.lifeOrder

- **Value**: 0

## Provided Configuration

### Process Chain - Pass

- **Type**: `Pass`
- **Configuration Type**:

```ts
export interface PassConfig extends SymbolConfig {
  index: number;
}
```

- **Default Configuration**:

```ts
{
  index: 0;
}
```

:::tip
This configuration is for internal use.
:::

### Sub-Pixel Enhanced Anti-Aliasing Process Chain - SMAAPass

- **Type**: `SMAAPass`
- **Configuration Type**:

```ts
export interface SMAAPassConfig extends PassConfig {}
```

- **Default Configuration**:

```ts
{
}
```

### Unreal Bloom Process Chain - UnrealBloomPass

- **Type**: `UnrealBloomPass`
- **Configuration Type**:


```ts
export interface UnrealBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
}
```

- **Default Configuration**:

```ts
{
   strength: 1.5,
   threshold: 0,
   radius: 0,
}
```

### Selective Bloom Process Chain - SelectiveBloomPass

- **Type**: `SelectiveBloomPass`
- **Configuration Type**:

```ts
export interface SelectiveBloomPassConfig extends PassConfig {
  strength: number;
  threshold: number;
  radius: number;
  /** Render scene vid */
  renderScene: string;
  /** Render camera vid */
  renderCamera: string;
  /** List of glowing object vids */
  selectedObjects: string[];
}
```

- **Default Configuration**:

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

### Screen Space Ambient Occlusion Process Chain - SSAOPass

- **Type**: `SSAOPass`
- **Configuration Type**:


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

- **Default Configuration**:

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
