# @vis-three/module-camera

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-camera">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-camera?color=blue">

## Module Information

### module.type

- **Value**: `camera`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

### module.extend

- **setCameraBySymbol**: Sets the engine's current camera using the camera `vid`.

```ts
import {generateConfig} from "@vis-three/middleware";

const camera = generateConfig(CONFIGTYPE.PERSPECTIVECAMERA);
engine.applyConfig(camera).setCameraBySymbol(camera.vid);
```

## Provided Configurations

### Camera

- **Type**: `Camera`
- **Configuration Type**:

```ts
export interface CameraConfig extends ObjectConfig {
    /** Adaptive to window size */
    adaptiveWindow: boolean;
}
```

:::tip
This type is for internal use.
:::

### Perspective Camera

- **Type**: `PerspectiveCamera`
- **Configuration Type**:

```typescript
export interface PerspectiveCameraConfig extends CameraConfig {
    /** Vertical field of view of the camera's frustum */
    fov: number;
    /** Aspect ratio of the camera's frustum */
    aspect: number;
    /** Near plane of the camera's frustum */
    near: number;
    /** Far plane of the camera's frustum */
    far: number;
}
```

- **Default Configuration**:

```ts
{
    adaptiveWindow: false, 
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50,
}
```

### Orthographic Camera

- **Type**: `OrthographicCamera`
- **Configuration Type**:

```typescript
export interface OrthographicCameraConfig extends CameraConfig {
    /** Left side of the camera's frustum */
    left: number;
    /** Right side of the camera's frustum */
    right: number;
    /** Top side of the camera's frustum */
    top: number;
    /** Bottom side of the camera's frustum */
    bottom: number;
    /** Near plane of the camera's frustum */
    near: number;
    /** Far plane of the camera's frustum */
    far: number;
    /** Zoom factor of the camera */
    zoom: number;
}

```

- **Default Configuration**:
```ts
{
    adaptiveWindow: false,
    fov: 45,
    aspect: 1920 / 1080,
    near: 5,
    far: 50,
  }
```
