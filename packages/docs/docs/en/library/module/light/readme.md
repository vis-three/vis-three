# @vis-three/module-light

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-light">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-light?color=blue">

## Module Information

### module.type

- **Value**: `light`

### module.object

- **Value**: `true`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.THREE` - 300

## Provided Configuration

### Light - Light

- **Type**: `Light`
- **Configuration Type**:

```ts
export interface LightConifg extends ObjectConfig {
  color: string;
  intensity: number;
}
```

- **Default Configuration**:

```ts
{
   color: "rgb(255, 255, 255)",
   intensity: 1,
}
```

:::tip
This configuration is for internal use.
:::

### Ambient Light - AmbientLight

- **Type**: `AmbientLight`
- **Reference**: [https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight](https://threejs.org/docs/index.html?q=light#api/en/lights/AmbientLight)
- **Configuration Type**:

```ts
export type AmbientLightConfig = LightConifg;
```

- **Default Configuration**:

```ts
{
   color: "rgb(255, 255, 255)",
   intensity: 1,
}
```

### Point Light - PointLight

- **Type**: `PointLight`
- **Reference**: [https://threejs.org/docs/index.html?q=light#api/en/lights/PointLight](https://threejs.org/docs/index.html?q=light#api/en/lights/PointLight)
- **Configuration Type**:

```ts
export interface PointLightConfig extends LightConifg {
  distance: number;
  decay: number;
}
```

- **Default Configuration**:

```ts
{
   color: "rgb(255, 255, 255)",
   intensity: 1,
}
```

### Spot Light - SpotLight

- **Type**: `SpotLight`
- **Reference**: [https://threejs.org/docs/index.html?q=light#api/en/lights/SpotLight](https://threejs.org/docs/index.html?q=light#api/en/lights/SpotLight)
- **Configuration Type**:

```ts
export interface SpotLightConfig extends LightConifg {
  distance: number;
  angle: number;
  penumbra: number;
  decay: number;
}
```

- **Default Configuration**:

```ts
{
   distance: 30,
   angle: (Math.PI / 180) * 45,
   penumbra: 0.01,
   decay: 0.01,
}
```

### Directional Light - DirectionalLight

- **Type**: `DirectionalLight`
- **Reference**: [https://threejs.org/docs/index.html?q=light#api/en/lights/DirectionalLight](https://threejs.org/docs/index.html?q=light#api/en/lights/DirectionalLight)
- **Configuration Type**:

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

- **Default Configuration**:

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

### Hemisphere Light - HemisphereLight

- **Type**: `HemisphereLight`
- **Reference**: [https://threejs.org/docs/index.html?q=light#api/en/lights/HemisphereLight](https://threejs.org/docs/index.html?q=light#api/en/lights/HemisphereLight)
- **Configuration Type**:

```ts
export interface HemisphereLightConfig extends LightConifg {
  groundColor: string;
}
```

- **Default Configuration**:

```ts
{
   color: "rgb(255, 255, 255)",
   groundColor: "rgb(0, 0, 0)",
}
```

### Rect Area Light - RectAreaLight

- **Type**: `RectAreaLight`
- **Reference**: [https://threejs.org/docs/index.html?q=light#api/en/lights/RectAreaLight](https://threejs.org/docs/index.html?q=light#api/en/lights/RectAreaLight)
- **Configuration Type**:

```ts
export interface RectAreaLightConfig extends LightConifg {
  width: number;
  height: number;
}
```

- **Default Configuration**:

```ts
{
   width: 10,
   height: 10,
}
```
