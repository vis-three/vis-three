# Interface: StrategyOptions<E\>

[strategy](../modules/strategy.md).StrategyOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md) |

## Table of contents

### Properties

- [condition](strategy.StrategyOptions.md#condition)
- [exec](strategy.StrategyOptions.md#exec)
- [name](strategy.StrategyOptions.md#name)
- [rollback](strategy.StrategyOptions.md#rollback)

## Properties

### condition

• **condition**: `string`[]

#### Defined in

[strategy/index.ts:5](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/strategy/index.ts#L5)

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

[strategy/index.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/strategy/index.ts#L6)

___

### name

• **name**: `string`

#### Defined in

[strategy/index.ts:4](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/strategy/index.ts#L4)

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

[strategy/index.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/strategy/index.ts#L7)
