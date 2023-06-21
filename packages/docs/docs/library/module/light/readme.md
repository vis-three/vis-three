# @vis-three/module-light

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-light">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-light?color=blue">

## 模块信息

### module.type

- **值**: `light`

### module.object

- **值**: `true`

### module.lifeOrder

- **值**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## 提供配置

### 灯光-Light

- **类型**：`Light`
- **配置类型**:

```ts
export interface LightConifg extends ObjectConfig {
  color: string;
  intensity: number;
}
```

- **默认配置**:

```ts
{
   color: "rgb(255, 255, 255)",
   intensity: 1,
}
```

:::tip
此配置为内部使用
:::

### 环境光-AmbientLight

- **类型**：`AmbientLight`
- **参照**：[https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight](https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight)
- **配置类型**:

```ts
export type AmbientLightConfig = LightConifg;
```

- **默认配置**:

```ts
{
   color: "rgb(255, 255, 255)",
   intensity: 1,
}
```

### 点光-PointLight

- **类型**：`PointLight`
- **参照**：[https://threejs.org/docs/index.html?q=light#api/en/lights/PointLight](https://threejs.org/docs/index.html?q=light#api/en/lights/PointLight)
- **配置类型**:

```ts
export interface PointLightConfig extends LightConifg {
  distance: number;
  decay: number;
}
```

- **默认配置**:

```ts
{
   color: "rgb(255, 255, 255)",
   intensity: 1,
}
```

### 聚光-SpotLight

- **类型**：`SpotLight`
- **参照**：[https://threejs.org/docs/index.html?q=light#api/en/lights/SpotLight](https://threejs.org/docs/index.html?q=light#api/en/lights/SpotLight)
- **配置类型**:

```ts
export interface SpotLightConfig extends LightConifg {
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
}
```

- **默认配置**:

```ts
{
   distance: 30,
   angle: (Math.PI / 180) * 45,
   penumbra: 0.01,
   decay: 0.01,
}
```

### 平行光-DirectionalLight

- **类型**：`DirectionalLight`
- **参照**：[https://threejs.org/docs/index.html?q=light#api/en/lights/DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/lights/DirectionalLight)
- **配置类型**:

```ts
export interface DirectionalLightConfig extends LightConifg {
  shadow: {
    mapSize: {
      width: number;
      height: number;
    };
    camera: {
      near: number;
      far: number;
    };
  };
}
```

- **默认配置**:

```ts
{
   shadow: {
      mapSize: {
         width: 512,
         height: 512,
      },
      camera: {
         near: 0.5,
         far: 500,
      },
   },
}
```

### 半球光-HemisphereLight

- **类型**：`HemisphereLight`
- **参照**：[https://threejs.org/docs/index.html?q=light#api/en/lights/HemisphereLight](https://threejs.org/docs/index.html?q=light#api/en/lights/HemisphereLight)
- **配置类型**:

```ts
export interface HemisphereLightConfig extends LightConifg {
  groundColor: string;
}
```

- **默认配置**:

```ts
{
   color: "rgb(255, 255, 255)",
   groundColor: "rgb(0, 0, 0)",
}
```

### 平面光-RectAreaLight

- **类型**：`RectAreaLight`
- **参照**：[https://threejs.org/docs/index.html?q=light#api/en/lights/RectAreaLight](https://threejs.org/docs/index.html?q=light#api/en/lights/RectAreaLight)
- **配置类型**:

```ts
export interface RectAreaLightConfig extends LightConifg {
  width: number;
  height: number;
}
```

- **默认配置**:

```ts
{
   width: 10,
   height: 10,
}
```
