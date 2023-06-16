# Interface: MeshBasicMaterialConfig

[MaterialConfig](../modules/MaterialConfig.md).MeshBasicMaterialConfig

基础网格材质,这种材质不受光照的影响。

**`See`**

[https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)

## Hierarchy

- [`MaterialConfig`](MaterialConfig.MaterialConfig.md)

  ↳ **`MeshBasicMaterialConfig`**

## Properties

### alphaMap

• **alphaMap**: `string`

alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。值为vid标识

#### Defined in

[library/module/material/MaterialConfig.ts:96](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L96)

___

### alphaTest

• **alphaTest**: `number`

设置运行alphaTest时要使用的alpha值。如果不透明度低于此值，则不会渲染材质。默认值为0。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[alphaTest](MaterialConfig.MaterialConfig.md#alphatest)

#### Defined in

[library/module/material/MaterialConfig.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L19)

___

### aoMap

• **aoMap**: `string`

该纹理的红色通道用作环境遮挡贴图。aoMap需要第二组UV。值为vid标识

#### Defined in

[library/module/material/MaterialConfig.ts:98](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L98)

___

### aoMapIntensity

• **aoMapIntensity**: `number`

环境遮挡效果的强度。零是不遮挡效果。

#### Defined in

[library/module/material/MaterialConfig.ts:74](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L74)

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

材质的颜色(Color)

#### Defined in

[library/module/material/MaterialConfig.ts:70](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L70)

___

### colorWrite

• **colorWrite**: `boolean`

是否渲染材质的颜色。 这可以与网格的renderOrder属性结合使用，以创建遮挡其他对象的不可见对象。

#### Inherited from

[MaterialConfig](MaterialConfig.MaterialConfig.md).[colorWrite](MaterialConfig.MaterialConfig.md#colorwrite)

#### Defined in

[library/module/material/MaterialConfig.ts:21](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L21)

___

### combine

• **combine**: `number`

如何将表面颜色的结果与环境贴图（如果有）结合起来。

#### Defined in

[library/module/material/MaterialConfig.ts:72](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L72)

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

### envMap

• **envMap**: `string`

环境贴图。值为vid标识

#### Defined in

[library/module/material/MaterialConfig.ts:94](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L94)

___

### fog

• **fog**: `boolean`

材质是否受雾影响。

#### Defined in

[library/module/material/MaterialConfig.ts:76](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L76)

___

### lightMap

• **lightMap**: `string`

光照贴图。lightMap需要第二组UV。值为vid标识

#### Defined in

[library/module/material/MaterialConfig.ts:100](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L100)

___

### lightMapIntensity

• **lightMapIntensity**: `number`

烘焙光的强度。

#### Defined in

[library/module/material/MaterialConfig.ts:78](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L78)

___

### map

• **map**: `string`

颜色贴图。值为vid标识

#### Defined in

[library/module/material/MaterialConfig.ts:92](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L92)

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

### reflectivity

• **reflectivity**: `number`

环境贴图对表面的影响程度; 见.combine。有效范围介于0（无反射）和1（完全反射）之间。

#### Defined in

[library/module/material/MaterialConfig.ts:80](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L80)

___

### refractionRatio

• **refractionRatio**: `number`

空气的折射率（IOR）（约为1）除以材质的折射率。它与环境映射模式THREE.CubeRefractionMapping 和THREE.EquirectangularRefractionMapping一起使用。折射率不应超过1

#### Defined in

[library/module/material/MaterialConfig.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L82)

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

### specularMap

• **specularMap**: `string`

材质使用的高光贴图。 值为vid标识

#### Defined in

[library/module/material/MaterialConfig.ts:102](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L102)

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

___

### wireframe

• **wireframe**: `boolean`

将几何体渲染为线框。

#### Defined in

[library/module/material/MaterialConfig.ts:84](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L84)

___

### wireframeLinecap

• **wireframeLinecap**: `string`

定义线两端的外观。可选值为 'butt'，'round' 和 'square'。

#### Defined in

[library/module/material/MaterialConfig.ts:86](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L86)

___

### wireframeLinejoin

• **wireframeLinejoin**: `string`

定义线连接节点的样式。可选值为 'round', 'bevel' 和 'miter'。

#### Defined in

[library/module/material/MaterialConfig.ts:88](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L88)

___

### wireframeLinewidth

• **wireframeLinewidth**: `number`

控制线框宽度。默认值为1。由于OpenGL Core Profile与大多数平台上WebGL渲染器的限制， 无论如何设置该值，线宽始终为1。

#### Defined in

[library/module/material/MaterialConfig.ts:90](https://github.com/Shiotsukikaedesari/vis-three/blob/0d9a7b02/packages/library/module/material/MaterialConfig.ts#L90)
