# @vis-three/module-scene

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-scene">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-scene?color=blue">

## Module Information

### module.type

- **Value**: `scene`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE + 1` - 301

### module.extend

- **setSceneBySymbol**: Sets the current scene of the engine by camera vid


```ts
import { generateConfig } from "@vis-three/middleware";

const scene = generateConfig(CONFIGTYPE.SCENE);
engine.applyConfig(scene).setSceneBySymbol(scene.vid);
```

## Provided Configuration

### Scene - Scene

- **Type**: `Scene`
- **Configuration Type**:

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

- **Default Configuration**:

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
If the `vid` attribute is not provided in the `generateConfig` for the scene, a default `vid` scene will be generated.
:::
