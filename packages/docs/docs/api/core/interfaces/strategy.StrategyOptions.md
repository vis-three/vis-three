# Interface: StrategyOptions<E\>

[strategy](../modules/strategy.md).StrategyOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md) |

## Properties

### condition

• **condition**: `string`[]

#### Defined in

[strategy/index.ts:5](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/strategy/index.ts#L5)

___

### exec

• **exec**: (`engine`: `E`) => `void`

#### Type declaration

▸ (`engine`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `E` |

##### Returns

`void`

#### Defined in

[strategy/index.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/strategy/index.ts#L6)

___

### name

• **name**: `string`

#### Defined in

[strategy/index.ts:4](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/strategy/index.ts#L4)

___

### rollback

• **rollback**: (`engine`: `E`) => `void`

#### Type declaration

▸ (`engine`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `E` |

##### Returns

`void`

#### Defined in

[strategy/index.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/strategy/index.ts#L7)
