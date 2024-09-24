# Class: Bus

[utils](../modules/utils.md).[Bus](../modules/utils.Bus.md).Bus

## Constructors

### constructor

• **new Bus**()

## Properties

### map

• **map**: `WeakMap`<`object`, `EventDispatcher`\>

#### Defined in

[packages/middleware/utils/Bus.ts:4](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L4)

## Methods

### check

▸ **check**(`object`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |

#### Returns

`boolean`

#### Defined in

[packages/middleware/utils/Bus.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L18)

___

### create

▸ **create**(`object`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/Bus.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L6)

___

### dispose

▸ **dispose**(`object`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/Bus.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L14)

___

### emit

▸ **emit**(`object`, `type`, `data?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `type` | `string` |
| `data?` | `object` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/Bus.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L22)

___

### off

▸ **off**(`object`, `type`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `type` | `string` |
| `callback` | (`event`: `BaseEvent`) => `void` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/Bus.ts:49](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L49)

___

### on

▸ **on**(`object`, `type`, `callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `object` |
| `type` | `string` |
| `callback` | (`event`: `BaseEvent`) => `void` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/Bus.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/Bus.ts#L35)
