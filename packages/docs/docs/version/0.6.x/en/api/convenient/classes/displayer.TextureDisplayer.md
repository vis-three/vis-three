# Class: TextureDisplayer

[displayer](../modules/displayer.md).TextureDisplayer

## Constructors

### constructor

• **new TextureDisplayer**(`parameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters?` | [`TextureDisplayerParameters`](../interfaces/displayer.TextureDisplayerParameters.md) |

#### Defined in

[displayer/TextureDisplayer.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L26)

## Properties

### camera

• `Private` **camera**: `PerspectiveCamera`

#### Defined in

[displayer/TextureDisplayer.ts:24](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L24)

___

### dom

• `Private` `Optional` **dom**: `HTMLElement`

#### Defined in

[displayer/TextureDisplayer.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L19)

___

### renderer

• `Private` **renderer**: `WebGLRenderer`

#### Defined in

[displayer/TextureDisplayer.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L22)

___

### scene

• `Private` **scene**: `Scene`

#### Defined in

[displayer/TextureDisplayer.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L23)

___

### texture

• `Private` `Optional` **texture**: `any`

#### Defined in

[displayer/TextureDisplayer.ts:20](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L20)

___

### ambientLight

▪ `Static` **ambientLight**: `any`

#### Defined in

[displayer/TextureDisplayer.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L17)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Defined in

[displayer/TextureDisplayer.ts:112](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L112)

___

### getDataURL

▸ **getDataURL**(`mine`): `any`

导出图片dataURL

#### Parameters

| Name | Type | Description |
| :------ | :------ |:------------|
| `mine` | `string` | Image Format|

#### Returns

`any`

DataURL

#### Defined in

[displayer/TextureDisplayer.ts:107](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L107)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[displayer/TextureDisplayer.ts:98](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L98)

___

### setDom

▸ **setDom**(`dom`): [`TextureDisplayer`](displayer.TextureDisplayer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `HTMLElement` |

#### Returns

[`TextureDisplayer`](displayer.TextureDisplayer.md)

#### Defined in

[displayer/TextureDisplayer.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L67)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`TextureDisplayer`](displayer.TextureDisplayer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width?` | `number` |
| `height?` | `number` |

#### Returns

[`TextureDisplayer`](displayer.TextureDisplayer.md)

#### Defined in

[displayer/TextureDisplayer.ts:76](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L76)

___

### setTexture

▸ **setTexture**(`texture`): [`TextureDisplayer`](displayer.TextureDisplayer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `texture` | `Texture` |

#### Returns

[`TextureDisplayer`](displayer.TextureDisplayer.md)

#### Defined in

[displayer/TextureDisplayer.ts:61](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/TextureDisplayer.ts#L61)
