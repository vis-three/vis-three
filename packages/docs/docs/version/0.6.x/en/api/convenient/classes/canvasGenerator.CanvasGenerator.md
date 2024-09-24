# Class: CanvasGenerator

[canvasGenerator](../modules/canvasGenerator.md).CanvasGenerator

## Constructors

### constructor

• **new CanvasGenerator**(`parameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters?` | [`CanvasGeneratorParameters`](../interfaces/canvasGenerator.CanvasGeneratorParameters.md) |

#### Defined in

[canvasGenerator/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L18)

## Properties

### canvas

• **canvas**: `HTMLCanvasElement`

#### Defined in

[canvasGenerator/index.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L16)

## Methods

### clear

▸ **clear**(`x?`, `y?`, `width?`, `height?`): [`CanvasGenerator`](canvasGenerator.CanvasGenerator.md)

Clear the Canvas

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `x` | `number` | `0` | position x px |
| `y` | `number` | `0` | position z px |
| `width?` | `number` | `undefined` | width px |
| `height?` | `number` | `undefined` | height px |

#### Returns

[`CanvasGenerator`](canvasGenerator.CanvasGenerator.md)

this

#### Defined in

[canvasGenerator/index.ts:53](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L53)

___

### draw

▸ **draw**(`fun`): [`CanvasGenerator`](canvasGenerator.CanvasGenerator.md)

Draw on the Canvas

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fun` | (`ctx`: `CanvasRenderingContext2D`) => `void` | callback(ctx) |

#### Returns

[`CanvasGenerator`](canvasGenerator.CanvasGenerator.md)

this

#### Defined in

[canvasGenerator/index.ts:72](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L72)

___

### get

▸ **get**(): `HTMLCanvasElement`

**`Deprecated`**

use getDom

#### Returns

`HTMLCanvasElement`

#### Defined in

[canvasGenerator/index.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L33)

___

### getDom

▸ **getDom**(): `HTMLCanvasElement`

Get canvas dom

#### Returns

`HTMLCanvasElement`

HTMLCanvasElement

#### Defined in

[canvasGenerator/index.ts:41](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L41)

___

### preview

▸ **preview**(`parameters?`): [`CanvasGenerator`](canvasGenerator.CanvasGenerator.md)

Canvas Preview

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parameters?` | `PreviewParameters` | style position |

#### Returns

[`CanvasGenerator`](canvasGenerator.CanvasGenerator.md)

this

#### Defined in

[canvasGenerator/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/canvasGenerator/index.ts#L89)
