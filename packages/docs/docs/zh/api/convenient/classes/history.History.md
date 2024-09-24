# Class: History

[history](../modules/history.md).History

## Constructors

### constructor

• **new History**(`step?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `step?` | `number` |

#### Defined in

[history/index.ts:19](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L19)

## Properties

### actionList

• `Private` **actionList**: [`Action`](history.Action.md)[] = `[]`

#### Defined in

[history/index.ts:15](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L15)

___

### index

• `Private` **index**: `number` = `-1`

#### Defined in

[history/index.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L16)

___

### step

• `Private` **step**: `number` = `50`

#### Defined in

[history/index.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L17)

## Methods

### apply

▸ **apply**(`action`, `exec?`): `void`

注册动作

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `action` | [`Action`](history.Action.md) | `undefined` | new class extends BasicAction |
| `exec` | `boolean` | `false` | 是否立即执行动作的next |

#### Returns

`void`

#### Defined in

[history/index.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L32)

___

### clear

▸ **clear**(): `void`

#### Returns

`void`

#### Defined in

[history/index.ts:75](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L75)

___

### do

▸ `Private` **do**(`command`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `command` | ``"next"`` \| ``"prev"`` |

#### Returns

`void`

#### Defined in

[history/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L23)

___

### redo

▸ **redo**(): `void`

#### Returns

`void`

#### Defined in

[history/index.ts:58](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L58)

___

### undo

▸ **undo**(): `void`

#### Returns

`void`

#### Defined in

[history/index.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/convenient/history/index.ts#L67)
