### BloomShader

物体发光 shader。

- **详情**

```ts
uniforms: {
    /**亮度 */
    brightness: { value: 0.8 },
    /**发光的拓展范围 */
    extend: { value: 5.0 },
    /**衰减比例 */
    specular: { value: 0.9 },
    /**渐变降低的值 */
    outFade: { value: 2.0 },
    /**渐变进入的值 */
    inFade: { value: 0.3 },
    /**发光颜色 */
    color: {
      value: {
        r: 1,
        g: 1,
        b: 1,
      },
    },
  }
```

### colorMixShader

颜色混合 shader。

- **详情**

```ts
  uniforms: {
    /**颜色A */
    colorA: {
      value: {
        r: 1,
        g: 0,
        b: 0,
      },
    },
    /**颜色B */
    colorB: {
      value: {
        r: 0,
        g: 1,
        b: 0,
      },
    },
    /**混合百分比 */
    percent: {
      value: 0.5,
    },
  },
```

### fragCoordTestingShader

屏幕颜色测试。

```ts
  uniforms: {
    /**采样尺寸 */
    resolution: {
      value: {
        x: 1920,
        y: 1080,
      },
    },
  },
```

### uvPulseShader

根据`uv`产生冲击效果的 shader。

```ts
  uniforms: {
    /**时间 */
    time: { value: 0.0 },
    /**冲击波的比例 */
    width: { value: 0.5 },
    /**冲击颜色 */
    color: {
      value: {
        r: 1,
        g: 0,
        b: 0,
      },
    },
    /**冲击的中心 */
    center: {
      value: {
        x: 0.5,
        y: 0.5,
      },
    },
  },
```
