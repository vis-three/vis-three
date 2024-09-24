# Class: MaterialDisplayer

[displayer](../modules/displayer.md).MaterialDisplayer

## Constructors

### constructor

• **new MaterialDisplayer**(`parameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters?` | [`MaterialDisplayerParameters`](../interfaces/displayer.MaterialDisplayerParameters.md) |

#### Defined in

[displayer/MaterialDisplayer.ts:59](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L59)

## Properties

### camera

• `Private` **camera**: `PerspectiveCamera`

#### Defined in

[displayer/MaterialDisplayer.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L56)

___

### dom

• `Private` `Optional` **dom**: `HTMLElement`

#### Defined in

[displayer/MaterialDisplayer.ts:52](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L52)

___

### material

• `Private` `Optional` **material**: `any`

#### Defined in

[displayer/MaterialDisplayer.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L51)

___

### object

• `Private` **object**: `Object3D`

#### Defined in

[displayer/MaterialDisplayer.ts:57](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L57)

___

### renderer

• `Private` **renderer**: `WebGLRenderer`

#### Defined in

[displayer/MaterialDisplayer.ts:54](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L54)

___

### scene

• `Private` **scene**: `Scene`

#### Defined in

[displayer/MaterialDisplayer.ts:55](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L55)

___

### ambientLight

▪ `Static` **ambientLight**: `any`

#### Defined in

[displayer/MaterialDisplayer.ts:41](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L41)

___

### geometry

▪ `Static` **geometry**: `any`

#### Defined in

[displayer/MaterialDisplayer.ts:43](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L43)

___

### plane

▪ `Static` **plane**: `any` = `plane`

#### Defined in

[displayer/MaterialDisplayer.ts:44](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L44)

___

### pointLight

▪ `Static` **pointLight**: `any` = `pointLight`

#### Defined in

[displayer/MaterialDisplayer.ts:42](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L42)

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

#### Defined in

[displayer/MaterialDisplayer.ts:169](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L169)

___

### getDataURL

▸ **getDataURL**(`mine`): `any`

Export Image as Data URL

#### Parameters

| Name | Type | Description |
| :------ | :------ |:------------|
| `mine` | `string` | Image Format|

#### Returns

`any`

DataURL

#### Defined in

[displayer/MaterialDisplayer.ts:164](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L164)

___

### render

▸ **render**(): `void`

#### Returns

`void`

#### Defined in

[displayer/MaterialDisplayer.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L155)

___

### setDom

▸ **setDom**(`dom`): [`MaterialDisplayer`](displayer.MaterialDisplayer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `HTMLElement` |

#### Returns

[`MaterialDisplayer`](displayer.MaterialDisplayer.md)

#### Defined in

[displayer/MaterialDisplayer.ts:124](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L124)

___

### setMaterial

▸ **setMaterial**(`material`): [`MaterialDisplayer`](displayer.MaterialDisplayer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `material` | `Material` |

#### Returns

[`MaterialDisplayer`](displayer.MaterialDisplayer.md)

#### Defined in

[displayer/MaterialDisplayer.ts:97](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L97)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`MaterialDisplayer`](displayer.MaterialDisplayer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `width?` | `number` |
| `height?` | `number` |

#### Returns

[`MaterialDisplayer`](displayer.MaterialDisplayer.md)

#### Defined in

[displayer/MaterialDisplayer.ts:133](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L133)

___

### dispose

▸ `Static` **dispose**(): `void`

#### Returns

`void`

#### Defined in

[displayer/MaterialDisplayer.ts:46](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/displayer/MaterialDisplayer.ts#L46)
