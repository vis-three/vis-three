# @vis-three/module-scene

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-scene">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-scene?color=blue">

## 模块信息

### module.type

- **值**: `scene`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE + 1` - 301

### module.extend

- **setSceneBySymbol**: 通过 相机 vid 设置 engine 的当前场景

```ts
import { generateConfig } from "@vis-three/middleware";

const scene = generateConfig(CONFIGTYPE.SCENE);
engine.applyConfig(scene).setSceneBySymbol(scene.vid);
```

## 提供配置

### 场景-Scene

- **类型**：`Scene`
- **配置类型**:

```ts
export interface SceneFogConfig {
  type: string; //"Fog" | "FogExp2" | "";
  color: string;
  near: number;
  far: number;
  density: number;
}

export interface SceneConfig extends ObjectConfig {
  background: string | null; // color or vid
  environment: string | null;
  fog: SceneFogConfig;
}
```

- **默认配置**：

```ts
{
   vid: uniqueSymbol("Scene"),
   background: "",
   environment: "",
   fog: {
      type: "",
      color: "rgb(150, 150, 150)",
      near: 1,
      far: 200,
      density: 0.003,
   },
}
```

:::tip
如果场景在`generateConfig`中不传入`vid`属性将生产默认`vid`场景。
:::
