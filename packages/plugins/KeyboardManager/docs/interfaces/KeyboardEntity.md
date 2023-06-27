# Interface: KeyboardEntity

## Properties

### desp

• **desp**: `string`

快捷键功能描述

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:8](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L8)

___

### keydown

• `Optional` **keydown**: (`event?`: `any`) => `void`

#### Type declaration

▸ (`event?`): `void`

按下时触发功能

##### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `any` |

##### Returns

`void`

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L10)

___

### keyup

• `Optional` **keyup**: (`event?`: `any`) => `void`

#### Type declaration

▸ (`event?`): `void`

抬起时触发功能

##### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `any` |

##### Returns

`void`

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L12)

___

### shortcutKey

• **shortcutKey**: `string`[]

快捷键组合，比如 ['ctrl', 'z']

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L6)
