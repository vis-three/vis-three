# Class: AntiShake

[utils](../modules/utils.md).AntiShake

## Constructors

### constructor

• **new AntiShake**()

## Properties

### list

• `Private` **list**: `Function`[] = `[]`

#### Defined in

[packages/middleware/utils/AntiShake.ts:2](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L2)

___

### time

• **time**: `number` = `0`

#### Defined in

[packages/middleware/utils/AntiShake.ts:5](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L5)

___

### timer

• `Private` `Optional` **timer**: `Timeout`

#### Defined in

[packages/middleware/utils/AntiShake.ts:3](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L3)

## Methods

### append

▸ **append**(`fun`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fun` | (`finish`: `boolean`) => `boolean` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/AntiShake.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L48)

___

### exec

▸ **exec**(`fun`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fun` | (`finish`: `boolean`) => `boolean` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/AntiShake.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L7)

___

### nextTick

▸ **nextTick**(`fun`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `fun` | () => `boolean` |

#### Returns

`void`

#### Defined in

[packages/middleware/utils/AntiShake.ts:56](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/utils/AntiShake.ts#L56)
