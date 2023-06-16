# Interface: MeshPhysicalMaterialConfig

[MaterialConfig](../modules/MaterialConfig.md).MeshPhysicalMaterialConfig

物理网格材质

**`See`**

[https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial)

## Hierarchy

- [`MeshStandardMaterialConfig`](MaterialConfig.MeshStandardMaterialConfig.md)

  ↳ **`MeshPhysicalMaterialConfig`**

## Properties

### alphaMap

• **alphaMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[alphaMap](MaterialConfig.MeshStandardMaterialConfig.md#alphamap)

#### Defined in

[library/module/material/MaterialConfig.ts:136](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L136)

___

### alphaTest

• **alphaTest**: `number`

设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[alphaTest](MaterialConfig.MeshStandardMaterialConfig.md#alphatest)

#### Defined in

[library/module/material/MaterialConfig.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L19)

___

### aoMap

• **aoMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[aoMap](MaterialConfig.MeshStandardMaterialConfig.md#aomap)

#### Defined in

[library/module/material/MaterialConfig.ts:137](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L137)

___

### aoMapIntensity

• **aoMapIntensity**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[aoMapIntensity](MaterialConfig.MeshStandardMaterialConfig.md#aomapintensity)

#### Defined in

[library/module/material/MaterialConfig.ts:109](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L109)

___

### attenuationColor

• **attenuationColor**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:234](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L234)

___

### attenuationDistance

• **attenuationDistance**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:235](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L235)

___

### blendDst

• **blendDst**: `number`

混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blendDst](MaterialConfig.MeshStandardMaterialConfig.md#blenddst)

#### Defined in

[library/module/material/MaterialConfig.ts:43](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L43)

___

### blendDstAlpha

• **blendDstAlpha**: ``null`` \| `number`

.blendDst的透明度。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blendDstAlpha](MaterialConfig.MeshStandardMaterialConfig.md#blenddstalpha)

#### Defined in

[library/module/material/MaterialConfig.ts:45](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L45)

___

### blendEquation

• **blendEquation**: `number`

使用混合时所采用的混合方程式。默认值为AddEquation。必须将材质的blending设置为CustomBlending才能生效。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blendEquation](MaterialConfig.MeshStandardMaterialConfig.md#blendequation)

#### Defined in

[library/module/material/MaterialConfig.ts:47](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L47)

___

### blendEquationAlpha

• **blendEquationAlpha**: ``null`` \| `number`

.blendEquation 的透明度。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blendEquationAlpha](MaterialConfig.MeshStandardMaterialConfig.md#blendequationalpha)

#### Defined in

[library/module/material/MaterialConfig.ts:49](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L49)

___

### blendSrc

• **blendSrc**: `number`

混合源。默认值为SrcAlphaFactor。必须将材质的blending设置为CustomBlending才能生效。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blendSrc](MaterialConfig.MeshStandardMaterialConfig.md#blendsrc)

#### Defined in

[library/module/material/MaterialConfig.ts:53](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L53)

___

### blendSrcAlpha

• **blendSrcAlpha**: ``null`` \| `number`

.blendSrc的透明度。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blendSrcAlpha](MaterialConfig.MeshStandardMaterialConfig.md#blendsrcalpha)

#### Defined in

[library/module/material/MaterialConfig.ts:55](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L55)

___

### blending

• **blending**: `Blending`

在使用此材质显示对象时要使用何种混合。必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[blending](MaterialConfig.MeshStandardMaterialConfig.md#blending)

#### Defined in

[library/module/material/MaterialConfig.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L51)

___

### bumpMap

• **bumpMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[bumpMap](MaterialConfig.MeshStandardMaterialConfig.md#bumpmap)

#### Defined in

[library/module/material/MaterialConfig.ts:135](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L135)

___

### bumpScale

• **bumpScale**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[bumpScale](MaterialConfig.MeshStandardMaterialConfig.md#bumpscale)

#### Defined in

[library/module/material/MaterialConfig.ts:110](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L110)

___

### clearcoat

• **clearcoat**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:236](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L236)

___

### clearcoatMap

• **clearcoatMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:249](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L249)

___

### clearcoatNormalMap

• **clearcoatNormalMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:250](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L250)

___

### clearcoatNormalScale

• **clearcoatNormalScale**: `Vector2Config`

#### Defined in

[library/module/material/MaterialConfig.ts:237](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L237)

___

### clearcoatRoughness

• **clearcoatRoughness**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:238](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L238)

___

### clearcoatRoughnessMap

• **clearcoatRoughnessMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:251](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L251)

___

### color

• **color**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[color](MaterialConfig.MeshStandardMaterialConfig.md#color)

#### Defined in

[library/module/material/MaterialConfig.ts:111](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L111)

___

### colorWrite

• **colorWrite**: `boolean`

是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[colorWrite](MaterialConfig.MeshStandardMaterialConfig.md#colorwrite)

#### Defined in

[library/module/material/MaterialConfig.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L21)

___

### depthTest

• **depthTest**: `boolean`

是否在渲染此材质时启用深度测试。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[depthTest](MaterialConfig.MeshStandardMaterialConfig.md#depthtest)

#### Defined in

[library/module/material/MaterialConfig.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L23)

___

### depthWrite

• **depthWrite**: `boolean`

渲染此材质是否对深度缓冲区有任何影响。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[depthWrite](MaterialConfig.MeshStandardMaterialConfig.md#depthwrite)

#### Defined in

[library/module/material/MaterialConfig.ts:25](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L25)

___

### displacementBias

• **displacementBias**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[displacementBias](MaterialConfig.MeshStandardMaterialConfig.md#displacementbias)

#### Defined in

[library/module/material/MaterialConfig.ts:113](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L113)

___

### displacementMap

• **displacementMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[displacementMap](MaterialConfig.MeshStandardMaterialConfig.md#displacementmap)

#### Defined in

[library/module/material/MaterialConfig.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L134)

___

### displacementScale

• **displacementScale**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[displacementScale](MaterialConfig.MeshStandardMaterialConfig.md#displacementscale)

#### Defined in

[library/module/material/MaterialConfig.ts:112](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L112)

___

### dithering

• **dithering**: `boolean`

是否对颜色应用抖动以消除条带的外观。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[dithering](MaterialConfig.MeshStandardMaterialConfig.md#dithering)

#### Defined in

[library/module/material/MaterialConfig.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L31)

___

### emissive

• **emissive**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[emissive](MaterialConfig.MeshStandardMaterialConfig.md#emissive)

#### Defined in

[library/module/material/MaterialConfig.ts:114](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L114)

___

### emissiveIntensity

• **emissiveIntensity**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[emissiveIntensity](MaterialConfig.MeshStandardMaterialConfig.md#emissiveintensity)

#### Defined in

[library/module/material/MaterialConfig.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L115)

___

### emissiveMap

• **emissiveMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[emissiveMap](MaterialConfig.MeshStandardMaterialConfig.md#emissivemap)

#### Defined in

[library/module/material/MaterialConfig.ts:133](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L133)

___

### envMap

• **envMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[envMap](MaterialConfig.MeshStandardMaterialConfig.md#envmap)

#### Defined in

[library/module/material/MaterialConfig.ts:132](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L132)

___

### envMapIntensity

• **envMapIntensity**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[envMapIntensity](MaterialConfig.MeshStandardMaterialConfig.md#envmapintensity)

#### Defined in

[library/module/material/MaterialConfig.ts:116](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L116)

___

### flatShading

• **flatShading**: `boolean`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[flatShading](MaterialConfig.MeshStandardMaterialConfig.md#flatshading)

#### Defined in

[library/module/material/MaterialConfig.ts:117](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L117)

___

### ior

• **ior**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:239](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L239)

___

### lightMap

• **lightMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[lightMap](MaterialConfig.MeshStandardMaterialConfig.md#lightmap)

#### Defined in

[library/module/material/MaterialConfig.ts:131](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L131)

___

### lightMapIntensity

• **lightMapIntensity**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[lightMapIntensity](MaterialConfig.MeshStandardMaterialConfig.md#lightmapintensity)

#### Defined in

[library/module/material/MaterialConfig.ts:118](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L118)

___

### map

• **map**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[map](MaterialConfig.MeshStandardMaterialConfig.md#map)

#### Defined in

[library/module/material/MaterialConfig.ts:130](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L130)

___

### metalness

• **metalness**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[metalness](MaterialConfig.MeshStandardMaterialConfig.md#metalness)

#### Defined in

[library/module/material/MaterialConfig.ts:119](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L119)

___

### metalnessMap

• **metalnessMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[metalnessMap](MaterialConfig.MeshStandardMaterialConfig.md#metalnessmap)

#### Defined in

[library/module/material/MaterialConfig.ts:129](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L129)

___

### name

• **name**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[name](MaterialConfig.MeshStandardMaterialConfig.md#name)

#### Defined in

[middleware/module/common/index.ts:4](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L4)

___

### needsUpdate

• **needsUpdate**: `boolean`

材质是否需要更新。一般来讲是不用手动更新，除非有特殊情况。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[needsUpdate](MaterialConfig.MeshStandardMaterialConfig.md#needsupdate)

#### Defined in

[library/module/material/MaterialConfig.ts:27](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L27)

___

### normalMap

• **normalMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[normalMap](MaterialConfig.MeshStandardMaterialConfig.md#normalmap)

#### Defined in

[library/module/material/MaterialConfig.ts:128](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L128)

___

### normalMapType

• **normalMapType**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[normalMapType](MaterialConfig.MeshStandardMaterialConfig.md#normalmaptype)

#### Defined in

[library/module/material/MaterialConfig.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L120)

___

### opacity

• **opacity**: `number`

在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值0.0表示完全透明，1.0表示完全不透明。在transparent为true时有效

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[opacity](MaterialConfig.MeshStandardMaterialConfig.md#opacity)

#### Defined in

[library/module/material/MaterialConfig.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L29)

___

### polygonOffset

• **polygonOffset**: `boolean`

是否使用多边形偏移。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[polygonOffset](MaterialConfig.MeshStandardMaterialConfig.md#polygonoffset)

#### Defined in

[library/module/material/MaterialConfig.ts:57](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L57)

___

### polygonOffsetFactor

• **polygonOffsetFactor**: `number`

设置多边形偏移系数。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[polygonOffsetFactor](MaterialConfig.MeshStandardMaterialConfig.md#polygonoffsetfactor)

#### Defined in

[library/module/material/MaterialConfig.ts:59](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L59)

___

### polygonOffsetUnits

• **polygonOffsetUnits**: `number`

设置多边形偏移单位。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[polygonOffsetUnits](MaterialConfig.MeshStandardMaterialConfig.md#polygonoffsetunits)

#### Defined in

[library/module/material/MaterialConfig.ts:61](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L61)

___

### reflectivity

• **reflectivity**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:240](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L240)

___

### refractionRatio

• **refractionRatio**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[refractionRatio](MaterialConfig.MeshStandardMaterialConfig.md#refractionratio)

#### Defined in

[library/module/material/MaterialConfig.ts:121](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L121)

___

### roughness

• **roughness**: `number`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[roughness](MaterialConfig.MeshStandardMaterialConfig.md#roughness)

#### Defined in

[library/module/material/MaterialConfig.ts:122](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L122)

___

### roughnessMap

• **roughnessMap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[roughnessMap](MaterialConfig.MeshStandardMaterialConfig.md#roughnessmap)

#### Defined in

[library/module/material/MaterialConfig.ts:127](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L127)

___

### shadowSide

• **shadowSide**: ``null`` \| `number`

定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[shadowSide](MaterialConfig.MeshStandardMaterialConfig.md#shadowside)

#### Defined in

[library/module/material/MaterialConfig.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L33)

___

### sheen

• **sheen**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:241](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L241)

___

### sheenColor

• **sheenColor**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:243](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L243)

___

### sheenColorMap

• **sheenColorMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:253](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L253)

___

### sheenRoughness

• **sheenRoughness**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:242](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L242)

___

### sheenRoughnessMap

• **sheenRoughnessMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:252](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L252)

___

### side

• **side**: `number`

定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide 和 THREE.DoubleSide。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[side](MaterialConfig.MeshStandardMaterialConfig.md#side)

#### Defined in

[library/module/material/MaterialConfig.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L35)

___

### specularColor

• **specularColor**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:245](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L245)

___

### specularColorMap

• **specularColorMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:255](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L255)

___

### specularIntensity

• **specularIntensity**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:244](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L244)

___

### specularIntensityMap

• **specularIntensityMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:254](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L254)

___

### thickness

• **thickness**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:246](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L246)

___

### thicknessMap

• **thicknessMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:256](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L256)

___

### toneMapped

• **toneMapped**: `boolean`

定义这个材质是否会被渲染器的toneMapping设置所影响。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[toneMapped](MaterialConfig.MeshStandardMaterialConfig.md#tonemapped)

#### Defined in

[library/module/material/MaterialConfig.ts:37](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L37)

___

### transmission

• **transmission**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:247](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L247)

___

### transmissionMap

• **transmissionMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:257](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L257)

___

### transparent

• **transparent**: `boolean`

定义此材质是否透明。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[transparent](MaterialConfig.MeshStandardMaterialConfig.md#transparent)

#### Defined in

[library/module/material/MaterialConfig.ts:39](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L39)

___

### type

• **type**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[type](MaterialConfig.MeshStandardMaterialConfig.md#type)

#### Defined in

[middleware/module/common/index.ts:3](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L3)

___

### vid

• **vid**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[vid](MaterialConfig.MeshStandardMaterialConfig.md#vid)

#### Defined in

[middleware/module/common/index.ts:2](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L2)

___

### visible

• **visible**: `boolean`

此材质是否可见。

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[visible](MaterialConfig.MeshStandardMaterialConfig.md#visible)

#### Defined in

[library/module/material/MaterialConfig.ts:41](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L41)

___

### wireframe

• **wireframe**: `boolean`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[wireframe](MaterialConfig.MeshStandardMaterialConfig.md#wireframe)

#### Defined in

[library/module/material/MaterialConfig.ts:123](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L123)

___

### wireframeLinecap

• **wireframeLinecap**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[wireframeLinecap](MaterialConfig.MeshStandardMaterialConfig.md#wireframelinecap)

#### Defined in

[library/module/material/MaterialConfig.ts:124](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L124)

___

### wireframeLinejoin

• **wireframeLinejoin**: `string`

#### Inherited from

[MeshStandardMaterialConfig](MaterialConfig.MeshStandardMaterialConfig.md).[wireframeLinejoin](MaterialConfig.MeshStandardMaterialConfig.md#wireframelinejoin)

#### Defined in

[library/module/material/MaterialConfig.ts:125](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L125)
