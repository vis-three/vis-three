# @vis-three/module-texture

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-texture">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-texture?color=blue">

## Module Information

### module.type

- **Value**: `texture`

### module.object

- **Value**: `false`

### module.lifeOrder

- **Value**: 0

## Provided Configuration

### Texture Base Class - Texture

- **Type**: `Texture`
- **Reference**: [https://threejs.org/docs/index.html#api/zh/textures/Texture](https://threejs.org/docs/index.html#api/zh/textures/Texture)
- **Configuration Type**:

```ts
export interface TextureConfig extends SymbolConfig {
  name: string;
  mapping: number;
  wrapS: number;
  wrapT: number;
  magFilter: number;
  minFilter: number;
  anisotropy: number;
  format: number;
  offset: Vector2Config;
  repeat: Vector2Config;
  rotation: number;
  center: Vector2Config;
  matrixAutoUpdate: boolean;
  encoding: number;
  needsUpdate: boolean;
  flipY: boolean;
}
```

- **Default Configuration**:

```ts
{
  mapping: UVMapping,
  wrapS: ClampToEdgeWrapping,
  wrapT: ClampToEdgeWrapping,
  magFilter: LinearFilter,
  minFilter: LinearMipmapLinearFilter,
  anisotropy: 1,
  format: RGBAFormat,
  flipY: true,
  offset: {
    x: 0,
    y: 0,
  },
  repeat: {
    x: 1,
    y: 1,
  },
  rotation: 0,
  center: {
    x: 0,
    y: 0,
  },
  matrixAutoUpdate: true,
  encoding: LinearEncoding,
  needsUpdate: false,
}
```

### Image Texture - ImageTexture

- **Type**: `ImageTexture`
- **Configuration Type**:

```ts
export interface ImageTextureConfig extends TextureConfig {
  /**通过resourceManager 解析的图片资源地址 */
  url: string;
}
```

- **Default Configuration**:

```ts
{
  url: "",
  minFilter: LinearFilter,
}
```

### Video Texture - VideoTexture

- **Type**: `VideoTexture`
- **Configuration Type**:

```ts
export interface VideoTextureConfig extends TextureConfig {
  /**通过resourceManager 解析的视频资源地址 */
  url: string;
}
```

- **Default Configuration**:

```ts
{
  url: "",
  minFilter: LinearFilter,
}
```

### Cube Texture - CubeTexture

- **Type**: `CubeTexture`
- **Configuration Type**:

```ts
export interface CubeTextureConfig extends TextureConfig {
  cube: {
      /** The image resource URL resolved through resourceManager for the negative x face */
      nx: string;
      /** The image resource URL resolved through resourceManager for the negative y face */
      ny: string;
      /** The image resource URL resolved through resourceManager for the negative z face */
      nz: string;
      /** The image resource URL resolved through resourceManager for the positive x face */
      px: string;
      /** The image resource URL resolved through resourceManager for the positive y face */
      py: string;
      /** The image resource URL resolved through resourceManager for the positive z face */
      pz: string;
  };
}
```

- **Default Configuration**:

```ts
{
  cube: {
    nx: "",
    ny: "",
    nz: "",
    px: "",
    py: "",
    pz: "",
  },
  mapping: CubeReflectionMapping,
  flipY: false,
}
```

### Canvas Texture - CanvasTexture

- **Type**: `CanvasTexture`
- **Configuration Type**:

```ts
export interface CanvasTextureConfig extends TextureConfig {
    /** The canvas resource URL resolved through resourceManager */
    url: string;
    /** Set to true to update if the canvas resource changes */
    needsUpdate: boolean;
}
```

- **Default Configuration**:

```ts
{
  url: "",
  needsUpdate: false,
}
```

### Load Texture - LoadTexture

- **Type**: `LoadTexture`
- **Configuration Type**:

```ts
export interface LoadTextureConfig extends TextureConfig {
  /** The texture resource URL resolved through resourceManager */
  url: string;
}
```

- **Default Configuration**:

```ts
{
  url: "",
}
```
