# Class: KeyboardManager

## Hierarchy

- `EventDispatcher`

  ↳ **`KeyboardManager`**

## Constructors

### constructor

• **new KeyboardManager**()

#### Overrides

EventDispatcher.constructor

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L18)

## Properties

### map

• `Private` **map**: `Map`<`any`, `any`\>

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:16](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L16)

## Methods

### addEventListener

▸ **addEventListener**<`C`\>(`type`, `listener`): `void`

添加事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.addEventListener

#### Defined in

[core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L23)

___

### cancel

▸ **cancel**(`keyArray`): [`KeyboardManager`](KeyboardManager.md)

注销快捷键

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyArray` | `string`[] | 快捷键组合 |

#### Returns

[`KeyboardManager`](KeyboardManager.md)

this

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:90](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L90)

___

### checkRepeat

▸ **checkRepeat**(`keyArray`): `boolean`

检查有无重复键

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyArray` | `string`[] | 快捷键组合 |

#### Returns

`boolean`

boolean

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:107](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L107)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L218)

___

### dispatchEvent

▸ **dispatchEvent**<`C`\>(`event`): `void`

触发事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `C` |

#### Returns

`void`

#### Inherited from

EventDispatcher.dispatchEvent

#### Defined in

[core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L101)

___

### emit

▸ **emit**<`C`\>(`name`, `params?`): `void`

触发事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `C`[``"type"``] |
| `params` | `Omit`<`C`, ``"type"``\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.emit

#### Defined in

[core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L134)

___

### eventCount

▸ **eventCount**(`type`): `number`

获取事件数量

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`number`

#### Inherited from

EventDispatcher.eventCount

#### Defined in

[core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L195)

___

### generateSymbol

▸ `Private` **generateSymbol**(`entity`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | `string`[] \| [`KeyboardEntity`](../interfaces/KeyboardEntity.md) |

#### Returns

`string`

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L22)

___

### getDocs

▸ **getDocs**(): `Pick`<[`KeyboardEntity`](../interfaces/KeyboardEntity.md), ``"shortcutKey"`` \| ``"desp"``\>[]

获取快捷键文档

#### Returns

`Pick`<[`KeyboardEntity`](../interfaces/KeyboardEntity.md), ``"shortcutKey"`` \| ``"desp"``\>[]

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:115](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L115)

___

### has

▸ **has**<`C`\>(`type`, `listener`): `boolean`

是否有此事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener` | `EventListener`<`C`\> |

#### Returns

`boolean`

#### Inherited from

EventDispatcher.has

#### Defined in

[core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L165)

___

### hasEventListener

▸ **hasEventListener**<`C`\>(`type`, `listener`): `boolean`

是否有此事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`boolean`

#### Inherited from

EventDispatcher.hasEventListener

#### Defined in

[core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L48)

___

### off

▸ **off**<`C`\>(`type`, `listener?`): `void`

移除事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener?` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.off

#### Defined in

[core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L178)

___

### on

▸ **on**<`C`\>(`type`, `listener`): `void`

订阅事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.on

#### Defined in

[core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L155)

___

### once

▸ **once**<`C`\>(`type`, `listener`): `void`

一次性事件触发

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.once

#### Defined in

[core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L120)

___

### popLatestEvent

▸ **popLatestEvent**(`type`): `void`

销毁该类型的最后一个事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Inherited from

EventDispatcher.popLatestEvent

#### Defined in

[core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L207)

___

### register

▸ **register**(`entity`): [`KeyboardManager`](KeyboardManager.md)

注册快捷键

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`KeyboardEntity`](../interfaces/KeyboardEntity.md) |

#### Returns

[`KeyboardManager`](KeyboardManager.md)

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L48)

___

### removeEvent

▸ **removeEvent**(`type`): `void`

移除该类型的所有事件

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Inherited from

EventDispatcher.removeEvent

#### Defined in

[core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L89)

___

### removeEventListener

▸ **removeEventListener**<`C`\>(`type`, `listener`): `void`

移除事件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `BaseEvent` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | `EventListener`<`C`\> |

#### Returns

`void`

#### Inherited from

EventDispatcher.removeEventListener

#### Defined in

[core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L66)

___

### update

▸ **update**(`entity`): [`KeyboardManager`](KeyboardManager.md)

更新快捷键

#### Parameters

| Name | Type |
| :------ | :------ |
| `entity` | [`KeyboardEntity`](../interfaces/KeyboardEntity.md) |

#### Returns

[`KeyboardManager`](KeyboardManager.md)

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:70](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L70)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/core/eventDispatcher/index.ts#L226)

___

### watch

▸ **watch**(`dom`): [`KeyboardManager`](KeyboardManager.md)

限定捷键监听dom- 默认document

#### Parameters

| Name | Type |
| :------ | :------ |
| `dom` | `undefined` \| `HTMLElement` |

#### Returns

[`KeyboardManager`](KeyboardManager.md)

this

#### Defined in

[plugins/KeyboardManager/KeyboardManager.ts:34](https://github.com/Shiotsukikaedesari/vis-three/blob/a6f33df6/packages/plugins/KeyboardManager/KeyboardManager.ts#L34)
