# @vis-three/module-geometry

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-geometry">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-geometry?color=blue">

## 模块信息

### module.type

- **值**: `geometry`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.TWO` - 200

## 提供配置

### 相机-Camera

- **类型**：`Camera`
- **配置类型**:

```ts
export interface CameraConfig extends ObjectConfig {
  /**自适应窗口大小 */
  adaptiveWindow: boolean;
}
```

:::tip
此类型为内部调用
:::

### 透视相机-PerspectiveCamera

- **类型**：`PerspectiveCamera`
- **配置类型**:

```ts
export interface PerspectiveCameraConfig extends CameraConfig {
  /**摄像机视锥体垂直视野角度 */
  fov: number;
  /**摄像机视锥体长宽比 */
  aspect: number;
  /**摄像机视锥体近端面 */
  near: number;
  /**摄像机视锥体远端面 */
  far: number;
}
```

- **默认配置**：

```ts
{
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50,
  }
```

### 正交相机-OrthographicCamera

- **类型**：`OrthographicCamera`
- **配置类型**:

```ts
export interface OrthographicCameraConfig extends CameraConfig {
  /**摄像机视锥体左侧面 */
  left: number;
  /**摄像机视锥体右侧面 */
  right: number;
  /**摄像机视锥体上侧面 */
  top: number;
  /**摄像机视锥体下侧面 */
  bottom: number;
  /**摄像机视锥体近端面 */
  near: number;
  /**摄像机视锥体远端面 */
  far: number;
  /**摄像机的缩放倍数 */
  zoom: number;
}
```

- **默认配置**：

```ts
{
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50,
  }
```
