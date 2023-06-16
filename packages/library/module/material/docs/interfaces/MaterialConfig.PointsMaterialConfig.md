# Interface: PointsMaterialConfig

[MaterialConfig](../modules/MaterialConfig.md).PointsMaterialConfig

点材质

**`See`**

[https://threejs.org/docs/index.html#api/zh/materials/PointsMaterial](https://threejs.org/docs/index.html#api/zh/materials/PointsMaterial)

## Hierarchy

- [`MaterialConfig`](MaterialConfig.MaterialConfig.md)

  ↳ **`PointsMaterialConfig`**

## Properties

### alphaMap

• **alphaMap**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:213](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L213)

___

### alphaTest

• **alphaTest**: `number`

设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[alphaTest](MaterialConfig.MaterialConfig.md#alphatest)

#### Defined in

[library/module/material/MaterialConfig.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L19)

___

### blendDst

• **blendDst**: `number`

混合目标。默认值为OneMinusSrcAlphaFactor。 目标因子所有可能的取值请参阅constants。 必须将材质的blending设置为CustomBlending才能生效。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blendDst](MaterialConfig.MaterialConfig.md#blenddst)

#### Defined in

[library/module/material/MaterialConfig.ts:43](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L43)

___

### blendDstAlpha

• **blendDstAlpha**: ``null`` \| `number`

.blendDst的透明度。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blendDstAlpha](MaterialConfig.MaterialConfig.md#blenddstalpha)

#### Defined in

[library/module/material/MaterialConfig.ts:45](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L45)

___

### blendEquation

• **blendEquation**: `number`

使用混合时所采用的混合方程式。默认值为AddEquation。必须将材质的blending设置为CustomBlending才能生效。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blendEquation](MaterialConfig.MaterialConfig.md#blendequation)

#### Defined in

[library/module/material/MaterialConfig.ts:47](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L47)

___

### blendEquationAlpha

• **blendEquationAlpha**: ``null`` \| `number`

.blendEquation 的透明度。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blendEquationAlpha](MaterialConfig.MaterialConfig.md#blendequationalpha)

#### Defined in

[library/module/material/MaterialConfig.ts:49](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L49)

___

### blendSrc

• **blendSrc**: `number`

混合源。默认值为SrcAlphaFactor。必须将材质的blending设置为CustomBlending才能生效。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blendSrc](MaterialConfig.MaterialConfig.md#blendsrc)

#### Defined in

[library/module/material/MaterialConfig.ts:53](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L53)

___

### blendSrcAlpha

• **blendSrcAlpha**: ``null`` \| `number`

.blendSrc的透明度。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blendSrcAlpha](MaterialConfig.MaterialConfig.md#blendsrcalpha)

#### Defined in

[library/module/material/MaterialConfig.ts:55](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L55)

___

### blending

• **blending**: `Blending`

在使用此材质显示对象时要使用何种混合。必须将其设置为CustomBlending才能使用自定义blendSrc, blendDst 或者 [page:Constant blendEquation]。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[blending](MaterialConfig.MaterialConfig.md#blending)

#### Defined in

[library/module/material/MaterialConfig.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L51)

___

### color

• **color**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:214](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L214)

___

### colorWrite

• **colorWrite**: `boolean`

是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[colorWrite](MaterialConfig.MaterialConfig.md#colorwrite)

#### Defined in

[library/module/material/MaterialConfig.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L21)

___

### depthTest

• **depthTest**: `boolean`

是否在渲染此材质时启用深度测试。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[depthTest](MaterialConfig.MaterialConfig.md#depthtest)

#### Defined in

[library/module/material/MaterialConfig.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L23)

___

### depthWrite

• **depthWrite**: `boolean`

渲染此材质是否对深度缓冲区有任何影响。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[depthWrite](MaterialConfig.MaterialConfig.md#depthwrite)

#### Defined in

[library/module/material/MaterialConfig.ts:25](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L25)

___

### dithering

• **dithering**: `boolean`

是否对颜色应用抖动以消除条带的外观。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[dithering](MaterialConfig.MaterialConfig.md#dithering)

#### Defined in

[library/module/material/MaterialConfig.ts:31](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L31)

___

### map

• **map**: `string`

#### Defined in

[library/module/material/MaterialConfig.ts:215](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L215)

___

### name

• **name**: `string`

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[name](MaterialConfig.MaterialConfig.md#name)

#### Defined in

[middleware/module/common/index.ts:4](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L4)

___

### needsUpdate

• **needsUpdate**: `boolean`

材质是否需要更新。一般来讲是不用手动更新，除非有特殊情况。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[needsUpdate](MaterialConfig.MaterialConfig.md#needsupdate)

#### Defined in

[library/module/material/MaterialConfig.ts:27](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L27)

___

### opacity

• **opacity**: `number`

在0.0 - 1.0的范围内的浮点数，表明材质的透明度。值0.0表示完全透明，1.0表示完全不透明。在transparent为true时有效

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[opacity](MaterialConfig.MaterialConfig.md#opacity)

#### Defined in

[library/module/material/MaterialConfig.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L29)

___

### polygonOffset

• **polygonOffset**: `boolean`

是否使用多边形偏移。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[polygonOffset](MaterialConfig.MaterialConfig.md#polygonoffset)

#### Defined in

[library/module/material/MaterialConfig.ts:57](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L57)

___

### polygonOffsetFactor

• **polygonOffsetFactor**: `number`

设置多边形偏移系数。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[polygonOffsetFactor](MaterialConfig.MaterialConfig.md#polygonoffsetfactor)

#### Defined in

[library/module/material/MaterialConfig.ts:59](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L59)

___

### polygonOffsetUnits

• **polygonOffsetUnits**: `number`

设置多边形偏移单位。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[polygonOffsetUnits](MaterialConfig.MaterialConfig.md#polygonoffsetunits)

#### Defined in

[library/module/material/MaterialConfig.ts:61](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L61)

___

### shadowSide

• **shadowSide**: ``null`` \| `number`

定义投影的面。设置时，可以是THREE.FrontSide, THREE.BackSide, 或Materials。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[shadowSide](MaterialConfig.MaterialConfig.md#shadowside)

#### Defined in

[library/module/material/MaterialConfig.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L33)

___

### side

• **side**: `number`

定义将要渲染哪一面 - 正面，背面或两者。 默认为THREE.FrontSide。其他选项有THREE.BackSide 和 THREE.DoubleSide。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[side](MaterialConfig.MaterialConfig.md#side)

#### Defined in

[library/module/material/MaterialConfig.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L35)

___

### size

• **size**: `number`

#### Defined in

[library/module/material/MaterialConfig.ts:216](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L216)

___

### sizeAttenuation

• **sizeAttenuation**: `boolean`

#### Defined in

[library/module/material/MaterialConfig.ts:217](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L217)

___

### toneMapped

• **toneMapped**: `boolean`

定义这个材质是否会被渲染器的toneMapping设置所影响。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[toneMapped](MaterialConfig.MaterialConfig.md#tonemapped)

#### Defined in

[library/module/material/MaterialConfig.ts:37](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L37)

___

### transparent

• **transparent**: `boolean`

定义此材质是否透明。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[transparent](MaterialConfig.MaterialConfig.md#transparent)

#### Defined in

[library/module/material/MaterialConfig.ts:39](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L39)

___

### type

• **type**: `string`

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[type](MaterialConfig.MaterialConfig.md#type)

#### Defined in

[middleware/module/common/index.ts:3](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L3)

___

### vid

• **vid**: `string`

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[vid](MaterialConfig.MaterialConfig.md#vid)

#### Defined in

[middleware/module/common/index.ts:2](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/middleware/module/common/index.ts#L2)

___

### visible

• **visible**: `boolean`

此材质是否可见。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[visible](MaterialConfig.MaterialConfig.md#visible)

#### Defined in

[library/module/material/MaterialConfig.ts:41](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L41)
