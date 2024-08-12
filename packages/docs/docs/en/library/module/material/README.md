# @vis-three/module-material

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/module-material">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/module-material?color=blue">

## Module Information

### module.type

- **Value**: `material`

### module.lifeOrder

- **Value**: `SUPPORT_LIFE_CYCLE.TWO` - 200

## Provided Configuration

### Base Material Configuration - Material

- **Type**: `Material`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/Material](https://threejs.org/docs/index.html#api/en/materials/Material)
- **Configuration Type**:

```ts
export interface MaterialConfig extends SymbolConfig {
    /** Sets the alpha value used when alphaTest is enabled. If the opacity is below this value, the material will not be rendered. Default is 0. */
    alphaTest: number;
    /** Whether to render the material's color. This can be combined with the renderOrder property of the mesh to create invisible objects that occlude other objects. */
    colorWrite: boolean;
    /** Whether to enable depth testing when rendering this material. */
    depthTest: boolean;
    /** Whether rendering this material affects the depth buffer. */
    depthWrite: boolean;
    /** Whether the material needs to be updated. Generally, it is not necessary to update manually unless there are special circumstances. */
    needsUpdate: boolean;
    /** A floating-point number in the range of 0.0 to 1.0 indicating the material's transparency. A value of 0.0 means fully transparent, and 1.0 means fully opaque. Effective when transparent is true. */
    opacity: number;
    /** Whether dithering is applied to colors to remove the appearance of banding. */
    dithering: boolean;
    /** Defines the side of the material to be used for shadows. Can be THREE.FrontSide, THREE.BackSide, or Materials. */
    shadowSide: number | null;
    /** Defines which side to render - front, back, or both. Default is THREE.FrontSide. Other options are THREE.BackSide and THREE.DoubleSide. */
    side: number;
    /** Defines whether this material is affected by the renderer's toneMapping settings. */
    toneMapped: boolean;
    /** Defines whether this material is transparent. */
    transparent: boolean;
    /** Whether this material is visible. */
    visible: boolean;
    /** Blend destination. Default is OneMinusSrcAlphaFactor. Refer to constants for all possible values. Must set the material's blending to CustomBlending to take effect. */
    blendDst: number;
    /** Transparency of blendDst. */
    blendDstAlpha: number | null;
    /** Blending equation used. Default is AddEquation. Must set the material's blending to CustomBlending to take effect. */
    blendEquation: number;
    /** Transparency of blendEquation. */
    blendEquationAlpha: number | null;
    /** Blending mode used when displaying objects with this material. Must set to CustomBlending to use custom blendSrc, blendDst, or blendEquation. */
    blending: Blending;
    /** Blend source. Default is SrcAlphaFactor. Must set the material's blending to CustomBlending to take effect. */
    blendSrc: number;
    /** Transparency of blendSrc. */
    blendSrcAlpha: number | null;
    /** Whether to use polygon offset. */
    polygonOffset: boolean;
    /** Sets the polygon offset factor. */
    polygonOffsetFactor: number;
    /** Sets the polygon offset units. */
    polygonOffsetUnits: number;

}
```

- **Default Configuration**:

```ts
{
    vid: "",
    type:"Material",
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

:::tip
This type is for internal use only.
:::

### Basic Mesh Material - MeshBasicMaterial

- **Type**: `MeshBasicMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial)
- **Configuration Type**:

```ts
export interface MeshBasicMaterialConfig extends MaterialConfig {
    /** The color of the material. */
    color: string;
    /** How the surface color result is combined with the environment map (if any). */
    combine: number;
    /** The intensity of the ambient occlusion effect. Zero means no occlusion effect. */
    aoMapIntensity: number;
    /** Whether the material is affected by fog. */
    fog: boolean;
    /** The intensity of the baked light. */
    lightMapIntensity: number;
    /** The degree to which the environment map affects the surface; see .combine. Valid range is between 0 (no reflection) and 1 (full reflection). */
    reflectivity: number;
    /** The refraction index of air (approximately 1) divided by the material's refraction index. Used with environment mapping modes THREE.CubeRefractionMapping and THREE.EquirectangularRefractionMapping. The refraction index should not exceed 1. */
    refractionRatio: number;
    /** Renders the geometry as a wireframe. */
    wireframe: boolean;
    /** Defines the appearance of the line ends. Optional values are 'butt', 'round', and 'square'. */
    wireframeLinecap: string;
    /** Defines the style of line join vertices. Optional values are 'round', 'bevel', and 'miter'. */
    wireframeLinejoin: string;
    /** Controls the width of the wireframe. The default value is 1. Due to OpenGL Core Profile and limitations of WebGL renderers on most platforms, the linewidth is always 1 regardless of the set value. */
    wireframeLinewidth: number;
    /** Color texture. The value is a vid identifier. */
    map: string;
    /** Environment map. The value is a vid identifier. */
    envMap: string;
    /** Alpha map is a grayscale texture used to control the opacity of the entire surface (black: fully transparent; white: fully opaque). The value is a vid identifier. */
    alphaMap: string;
    /** The red channel of this texture is used as an ambient occlusion map. aoMap requires a second set of UVs. The value is a vid identifier. */
    aoMap: string;
    /** Light map. lightMap requires a second set of UVs. The value is a vid identifier. */
    lightMap: string;
    /** The specular map used by the material. The value is a vid identifier. */
    specularMap: string;
}
```

- **Default Configuration**:

```ts
{
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

### Standard Mesh Material - MeshStandardMaterial

- **Type**: `MeshStandardMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial)
- **Configuration Type**:

```ts
export interface MeshStandardMaterialConfig extends MaterialConfig {
    /** The color of the material. */
    color: string;
    /** How the surface color result is combined with the environment map (if any). */
    combine: number;
    /** The intensity of the ambient occlusion effect. Zero means no occlusion effect. */
    aoMapIntensity: number;
    /** Whether the material is affected by fog. */
    fog: boolean;
    /** The intensity of the baked light. */
    lightMapIntensity: number;
    /** The degree to which the environment map affects the surface; see .combine. Valid range is between 0 (no reflection) and 1 (full reflection). */
    reflectivity: number;
    /** The refraction index of air (approximately 1) divided by the material's refraction index. Used with environment mapping modes THREE.CubeRefractionMapping and THREE.EquirectangularRefractionMapping. The refraction index should not exceed 1. */
    refractionRatio: number;
    /** Renders the geometry as a wireframe. */
    wireframe: boolean;
    /** Defines the appearance of the line ends. Optional values are 'butt', 'round', and 'square'. */
    wireframeLinecap: string;
    /** Defines the style of line join vertices. Optional values are 'round', 'bevel', and 'miter'. */
    wireframeLinejoin: string;
    /** Controls the width of the wireframe. The default value is 1. Due to OpenGL Core Profile and limitations of WebGL renderers on most platforms, the linewidth is always 1 regardless of the set value. */
    wireframeLinewidth: number;
    /** Color texture. The value is a vid identifier. */
    map: string;
    /** Environment map. The value is a vid identifier. */
    envMap: string;
    /** Alpha map is a grayscale texture used to control the opacity of the entire surface (black: fully transparent; white: fully opaque). The value is a vid identifier. */
    alphaMap: string;
    /** The red channel of this texture is used as an ambient occlusion map. aoMap requires a second set of UVs. The value is a vid identifier. */
    aoMap: string;
    /** Light map. lightMap requires a second set of UVs. The value is a vid identifier. */
    lightMap: string;
    /** The specular map used by the material. The value is a vid identifier. */
    specularMap: string;
}
```

- **Default Configuration**:

```ts
{
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

### Phong Mesh Material - MeshPhongMaterial

- **Type**: `MeshPhongMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial)
- **Configuration Type**:

```ts
export interface MeshPhongMaterialConfig extends MaterialConfig {
    aoMapIntensity: number;
    bumpScale: number;
    color: string;
    displacementScale: number;
    displacementBias: number;
    emissive: string;
    emissiveIntensity: number;
    flatShading: boolean;
    lightMapIntensity: number;
    normalMapType: number;
    refractionRatio: number;
    wireframe: boolean;
    wireframeLinecap: string;
    wireframeLinejoin: string;
    specular: string;
    shininess: number;
    combine: number;

    normalMap: string;
    map: string;
    lightMap: string;
    envMap: string;
    emissiveMap: string;
    displacementMap: string;
    bumpMap: string;
    alphaMap: string;
    aoMap: string;
    specularMap: string;
}
```

- **Default Configuration**:

```ts
{
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

### Physical Mesh Material - MeshPhysicalMaterial

- **Type**: `MeshPhysicalMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial)
- **Configuration Type**:

```ts
export interface MeshPhysicalMaterialConfig extends MeshStandardMaterialConfig {
    attenuationColor: string;
    attenuationDistance: number;
    clearcoat: number;
    clearcoatNormalScale: Vector2Config;
    clearcoatRoughness: number;
    ior: number;
    reflectivity: number;
    sheen: number;
    sheenRoughness: number;
    sheenColor: string;
    specularIntensity: number;
    specularColor: string;
    thickness: number;
    transmission: number;
    clearcoatMap: string;
    clearcoatNormalMap: string;
    clearcoatRoughnessMap: string;
    sheenRoughnessMap: string;
    sheenColorMap: string;
    specularIntensityMap: string;
    specularColorMap: string;
    thicknessMap: string;
    transmissionMap: string;
}
```

- **Default Configuration**:

```ts
{
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

### Sprite Material - SpriteMaterial

- **Type**: `SpriteMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial](https://threejs.org/docs/index.html#api/en/materials/SpriteMaterial)
- **Configuration Type**:

```ts
export interface SpriteMaterialConfig extends MaterialConfig {
    color: string;
    rotation: number;
    map: string;
    alphaMap: string;
    sizeAttenuation: boolean;
}
```

- **Default Configuration**:

```ts
{
    color: "rgb(255, 255, 255)",
    rotation: 0,
    map: "",
    alphaMap: "",
    sizeAttenuation: true,
}
```

### Basic Line Material - LineBasicMaterial

- **Type**: `LineBasicMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial)
- **Configuration Type**:

```ts
export interface LineBasicMaterialConfig extends MaterialConfig {
    color: string;
    linecap: string;
    linejoin: string;
    linewidth: number; // webgl limit always 1, use line2
}
```

- **Default Configuration**:

```ts
{
    color: "rgb(255, 255, 255)", 
    linecap: "round",
    linejoin: "round",
    linewidth: 1,
}
```

### Dashed Line Material - LineDashedMaterial

- **Type**: `LineDashedMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial](https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial)
- **Configuration Type**:

```ts
export interface LineDashedMaterialConfig extends LineBasicMaterialConfig {
    /** The size of the dashed line, which is the sum of dashes and gaps. */
    dashSize: number;
    /** The size of the gaps between dashes. */
    gapSize: number;
    /** The ratio of the dashed part in the line. */
    scale: number;
}
```

- **Default Configuration**:

```ts
{
    dashSize: 3,
    gapSize: 1,
    scale: 1,
}
```

### Points Material - PointsMaterial

- **Type**: `PointsMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/PointsMaterial](https://threejs.org/docs/index.html#api/en/materials/PointsMaterial)
- **Configuration Type**:

```ts
export interface PointsMaterialConfig extends MaterialConfig {
    alphaMap: string;
    color: string;
    map: string;
    size: number;
    sizeAttenuation: boolean;
}
```

- **Default Configuration**:

```ts
{
    map: "",
    alphaMap:"",
    color: "rgb(255, 255, 255)",
    sizeAttenuation: true,
    size: 1,
}
```

### Shader Material - ShaderMaterial

- **Type**: `ShaderMaterial`
- **Reference
  **: [https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial)
- **Configuration Type**:

```ts
export interface ShaderMaterialConfig extends MaterialConfig {
    shader: string;
    uniforms: { [key: string]: any };
}
```

- **Default Configuration**:

```ts
{
    shader: "defaultShader",
        uniforms: {}
,
}
```

:::tip
Shader configurations can be obtained through the `ShaderGeneratorManager` in `@vis-three/middleware`, which provides
access to predefined shaders and their configurations.
:::
