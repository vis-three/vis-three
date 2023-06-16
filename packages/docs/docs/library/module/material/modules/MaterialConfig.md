# Module: MaterialConfig

## Interfaces

- [LineBasicMaterialConfig](../interfaces/MaterialConfig.LineBasicMaterialConfig.md)
- [LineDashedMaterialConfig](../interfaces/MaterialConfig.LineDashedMaterialConfig.md)
- [LoadMaterialConfig](../interfaces/MaterialConfig.LoadMaterialConfig.md)
- [MaterialConfig](../interfaces/MaterialConfig.MaterialConfig.md)
- [MeshBasicMaterialConfig](../interfaces/MaterialConfig.MeshBasicMaterialConfig.md)
- [MeshPhongMaterialConfig](../interfaces/MaterialConfig.MeshPhongMaterialConfig.md)
- [MeshPhysicalMaterialConfig](../interfaces/MaterialConfig.MeshPhysicalMaterialConfig.md)
- [MeshStandardMaterialConfig](../interfaces/MaterialConfig.MeshStandardMaterialConfig.md)
- [PointsMaterialConfig](../interfaces/MaterialConfig.PointsMaterialConfig.md)
- [ShaderMaterialConfig](../interfaces/MaterialConfig.ShaderMaterialConfig.md)
- [SpriteMaterialConfig](../interfaces/MaterialConfig.SpriteMaterialConfig.md)

## Type Aliases

### MaterialAllType

Ƭ **MaterialAllType**: [`MeshBasicMaterialConfig`](../interfaces/MaterialConfig.MeshBasicMaterialConfig.md) \| [`MeshStandardMaterialConfig`](../interfaces/MaterialConfig.MeshStandardMaterialConfig.md) \| [`MeshPhongMaterialConfig`](../interfaces/MaterialConfig.MeshPhongMaterialConfig.md) \| [`LineBasicMaterialConfig`](../interfaces/MaterialConfig.LineBasicMaterialConfig.md) \| [`LineDashedMaterialConfig`](../interfaces/MaterialConfig.LineDashedMaterialConfig.md) \| [`SpriteMaterialConfig`](../interfaces/MaterialConfig.SpriteMaterialConfig.md) \| [`PointsMaterialConfig`](../interfaces/MaterialConfig.PointsMaterialConfig.md) \| [`ShaderMaterialConfig`](../interfaces/MaterialConfig.ShaderMaterialConfig.md) \| [`MeshPhysicalMaterialConfig`](../interfaces/MaterialConfig.MeshPhysicalMaterialConfig.md)

所有材质配置类型

#### Defined in

[library/module/material/MaterialConfig.ts:271](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L271)

## Functions

### getLineBasicMaterialConfig

▸ **getLineBasicMaterialConfig**(): [`LineBasicMaterialConfig`](../interfaces/MaterialConfig.LineBasicMaterialConfig.md)

获取基础线条材质配置 - 会与`getMaterialConfig`合并

**`Default`**

```ts
{
    type: "LineBasicMaterial",
    color: "rgb(255, 255, 255)",
    linecap: "round",
    linejoin: "round",
    linewidth: 1,
  }
```

#### Returns

[`LineBasicMaterialConfig`](../interfaces/MaterialConfig.LineBasicMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:641](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L641)

___

### getLineDashedMaterialConfig

▸ **getLineDashedMaterialConfig**(): [`LineDashedMaterialConfig`](../interfaces/MaterialConfig.LineDashedMaterialConfig.md)

获取虚线条材质配置 - 会与`getLineBasicMaterialConfig`合并

**`Default`**

```ts
{
    type: "LineDashedMaterial",
    dashSize: 3,
    gapSize: 1,
    scale: 1,
  }
```

#### Returns

[`LineDashedMaterialConfig`](../interfaces/MaterialConfig.LineDashedMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:662](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L662)

___

### getMaterialConfig

▸ **getMaterialConfig**(): [`MaterialConfig`](../interfaces/MaterialConfig.MaterialConfig.md)

获取材质基础配置

**`Default`**

```ts
{
    vid: "",
    type: "Material",
    alphaTest: 0,
    colorWrite: true,
    depthTest: true,
    depthWrite: true,
    name: "",
    needsUpdate: false,
    opacity: 1,
    dithering: false,
    shadowSide: null,
    side: FrontSide,
    toneMapped: true,
    transparent: false,
    visible: true,
    blendDst: OneMinusSrcAlphaFactor,
    blendDstAlpha: null,
    blendEquation: AddEquation,
    blendEquationAlpha: null,
    blending: NormalBlending,
    blendSrc: SrcAlphaFactor,
    blendSrcAlpha: null,

    polygonOffset: false,
    polygonOffsetFactor: 0,
    polygonOffsetUnits: 0,
  }
```

#### Returns

[`MaterialConfig`](../interfaces/MaterialConfig.MaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:316](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L316)

___

### getMeshBasicMaterialConfig

▸ **getMeshBasicMaterialConfig**(): [`MeshBasicMaterialConfig`](../interfaces/MaterialConfig.MeshBasicMaterialConfig.md)

获取网格基础材质配置 - 会与`getMaterialConfig`合并

**`Default`**

```ts
{
    type: "MeshBasicMaterial",
    color: "rgb(255, 255, 255)",
    combine: MultiplyOperation,
    aoMapIntensity: 1,
    fog: true,
    lightMapIntensity: 1,
    reflectivity: 1,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 1,

    map: "",
    envMap: "",
    alphaMap: "",
    aoMap: "",
    lightMap: "",
    specularMap: "",
  }
```

#### Returns

[`MeshBasicMaterialConfig`](../interfaces/MaterialConfig.MeshBasicMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:373](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L373)

___

### getMeshPhongMaterialConfig

▸ **getMeshPhongMaterialConfig**(): [`MeshPhongMaterialConfig`](../interfaces/MaterialConfig.MeshPhongMaterialConfig.md)

获取phong网格材质 - 会与`getMaterialConfig`合并

**`Default`**

```ts
{
    type: "MeshPhongMaterial",
    aoMapIntensity: 1,
    bumpScale: 1,
    color: "rgb(255, 255, 255)",
    displacementScale: 1,
    displacementBias: 0,
    emissive: "rgb(0, 0, 0)",
    emissiveIntensity: 1,
    envMapIntensity: 1,
    flatShading: false,
    lightMapIntensity: 1,
    normalMapType: TangentSpaceNormalMap,
    refractionRatio: 0.98,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    specular: "rgb(17, 17, 17)",
    shininess: 30,
    combine: MultiplyOperation,

    normalMap: "",
    map: "",
    lightMap: "",
    envMap: "",
    emissiveMap: "",
    displacementMap: "",
    bumpMap: "",
    alphaMap: "",
    aoMap: "",
    specularMap: "",
  }
```

#### Returns

[`MeshPhongMaterialConfig`](../interfaces/MaterialConfig.MeshPhongMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:573](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L573)

___

### getMeshPhysicalMaterialConfig

▸ **getMeshPhysicalMaterialConfig**(): [`MeshPhysicalMaterialConfig`](../interfaces/MaterialConfig.MeshPhysicalMaterialConfig.md)

获取物理网格材质 - 会与`getMeshStandardMaterialConfig`合并，也就是会合并基础标准网格默认值。

**`Default`**

```ts
{
      type: "MeshPhysicalMaterial",
      attenuationColor: "rgb(255, 255, 255)",
      attenuationDistance: 0,
      clearcoat: 0.0,
      clearcoatNormalScale: {
        x: 1,
        y: 1,
      },
      clearcoatRoughness: 0,
      ior: 1.5,
      reflectivity: 0.5,
      sheen: 0.0,
      sheenRoughness: 1.0,
      sheenColor: "rgb(255, 255, 255)",
      specularIntensity: 0.0,
      specularColor: "rgb(255, 255, 255)",
      thickness: 0,
      transmission: 0,

      clearcoatMap: "",
      clearcoatNormalMap: "",
      clearcoatRoughnessMap: "",
      sheenRoughnessMap: "",
      sheenColorMap: "",
      specularIntensityMap: "",
      specularColorMap: "",
      thicknessMap: "",
      transmissionMap: "",
    }
```

#### Returns

[`MeshPhysicalMaterialConfig`](../interfaces/MaterialConfig.MeshPhysicalMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:504](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L504)

___

### getMeshStandardMaterialConfig

▸ **getMeshStandardMaterialConfig**(): [`MeshStandardMaterialConfig`](../interfaces/MaterialConfig.MeshStandardMaterialConfig.md)

获取标准网格配置 - 会与`getMaterialConfig`合并

**`Default`**

```ts
{  
      type: "MeshStandardMaterial",
      aoMapIntensity: 1,
      bumpScale: 1,
      color: "rgb(255, 255, 255)",
      displacementScale: 1,
      displacementBias: 0,
      emissive: "rgb(0, 0, 0)",
      emissiveIntensity: 1,
      envMapIntensity: 1,
      flatShading: false,
      lightMapIntensity: 1,
      metalness: 0,
      normalMapType: TangentSpaceNormalMap,
      refractionRatio: 0.98,
      roughness: 1,
      wireframe: false,
      wireframeLinecap: "round",
      wireframeLinejoin: "round",

      roughnessMap: "",
      normalMap: "",
      metalnessMap: "",
      map: "",
      lightMap: "",
      envMap: "",
      emissiveMap: "",
      displacementMap: "",
      bumpMap: "",
      alphaMap: "",
      aoMap: "",
    }
```

#### Returns

[`MeshStandardMaterialConfig`](../interfaces/MaterialConfig.MeshStandardMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:434](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L434)

___

### getPointsMaterialConfig

▸ **getPointsMaterialConfig**(): [`PointsMaterialConfig`](../interfaces/MaterialConfig.PointsMaterialConfig.md)

获取点材质配置 - 会与`getMaterialConfig`合并

**`Default`**

```ts
{
    type: "PointsMaterial",
    map: "",
    alphaMap: "",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1,
  }
```

#### Returns

[`PointsMaterialConfig`](../interfaces/MaterialConfig.PointsMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:683](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L683)

___

### getShaderMaterialConfig

▸ **getShaderMaterialConfig**(): [`ShaderMaterialConfig`](../interfaces/MaterialConfig.ShaderMaterialConfig.md)

获取着色器材质配置 - 会与`getMaterialConfig`合并。可以通过`@vis-three/middleware`的`ShaderGeneratorManager`中获取相关着色器配置

**`Default`**

```ts
{
    type: "ShaderMaterial",
    shader: "defaultShader",
    uniforms: {},
  }
```

#### Returns

[`ShaderMaterialConfig`](../interfaces/MaterialConfig.ShaderMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:703](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L703)

___

### getSpriteMaterialConfig

▸ **getSpriteMaterialConfig**(): [`SpriteMaterialConfig`](../interfaces/MaterialConfig.SpriteMaterialConfig.md)

获取精灵材质配置 - 会与`getMaterialConfig`合并

**`Default`**

```ts
{
    type: "SpriteMaterial",
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true,
  }
```

#### Returns

[`SpriteMaterialConfig`](../interfaces/MaterialConfig.SpriteMaterialConfig.md)

#### Defined in

[library/module/material/MaterialConfig.ts:619](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L619)
