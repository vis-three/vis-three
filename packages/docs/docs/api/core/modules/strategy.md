# Module: strategy

## Table of contents

### Interfaces

- [StrategyOptions](../interfaces/strategy.StrategyOptions.md)

### Type Aliases

- [Strategy](strategy.md#strategy)

### Functions

- [defineStrategy](strategy.md#definestrategy)

## Type Aliases

### Strategy

Ƭ **Strategy**<`E`, `P`\>: (`params?`: `P`) => [`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<`E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md) |
| `P` | extends `object` = {} |

#### Type declaration

▸ (`params?`): [`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<`E`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `params?` | `P` |

##### Returns

[`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<`E`\>

#### Defined in

[strategy/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/strategy/index.ts#L10)

## Functions

### defineStrategy

▸ **defineStrategy**<`E`\>(`options`): [`Strategy`](strategy.md#strategy)<`E`, `any`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md)<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<`E`\> |

#### Returns

[`Strategy`](strategy.md#strategy)<`E`, `any`\>

#### Defined in

[strategy/index.ts:14](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/strategy/index.ts#L14)
