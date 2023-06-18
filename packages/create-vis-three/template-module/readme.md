# @vis-three/module-camera

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-camera">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-camera?color=blue">

## 模块信息

### module.type

- **值**: `camera`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

### module.extend

- **setCameraBySymbol**: 通过 相机 vid 设置 engine 的当前相机

```ts
import { generateConfig } from "@vis-three/middleware";

const camera = generateConfig(CONFIGTYPE.PERSPECTIVECAMERA);
engine.applyConfig(camera).setCameraBySymbol(camera.vid);
```

## 提供配置

### 透视相机-PerspectiveCamera

- **类型**：`PerspectiveCamera`
- **配置类型**:

```ts

```

- **默认配置**：

```ts

```
