# Class: EventDispatcher

[eventDispatcher](../modules/eventDispatcher.md).EventDispatcher

## Hierarchy

- **`EventDispatcher`**

  ↳ [`Engine`](engine.Engine.md)

## Constructors

### constructor

• **new EventDispatcher**()

## Properties

### listeners

• `Private` **listeners**: `Map`<`string`, `Function`[]\>

#### Defined in

[eventDispatcher/index.ts:15](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L15)

## Methods

### addEventListener

▸ **addEventListener**<`C`\>(`type`, `listener`): `void`

Add Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

Clear All Events

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L218)

___

### dispatchEvent

▸ **dispatchEvent**<`C`\>(`event`): `void`

Trigger Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `C` |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L101)

___

### emit

▸ **emit**<`C`\>(`name`, `params?`): `void`

Trigger Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `C`[``"type"``] |
| `params` | `Omit`<`C`, ``"type"``\> |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L134)

___

### eventCount

▸ **eventCount**(`type`): `number`

Get Event Count

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`number`

#### Defined in

[eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L195)

___

### has

▸ **has**<`C`\>(`type`, `listener`): `boolean`

Has Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`boolean`

#### Defined in

[eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L165)

___

### hasEventListener

▸ **hasEventListener**<`C`\>(`type`, `listener`): `boolean`

Has Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`boolean`

#### Defined in

[eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L48)

___

### off

▸ **off**<`C`\>(`type`, `listener?`): `void`

Remove Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener?` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L178)

___

### on

▸ **on**<`C`\>(`type`, `listener`): `void`

Subscribe to Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `C`[``"type"``] |
| `listener` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L155)

___

### once

▸ **once**<`C`\>(`type`, `listener`): `void`

Trigger Event Once

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L120)

___

### popLatestEvent

▸ **popLatestEvent**(`type`): `void`

Destroy Last Event of This Type

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L207)

___

### removeEvent

▸ **removeEvent**(`type`): `void`

Remove All Events of This Type

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L89)

___

### removeEventListener

▸ **removeEventListener**<`C`\>(`type`, `listener`): `void`

Remove Event

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`BaseEvent`](../interfaces/eventDispatcher.BaseEvent.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `listener` | [`EventListener`](../interfaces/eventDispatcher.EventListener.md)<`C`\> |

#### Returns

`void`

#### Defined in

[eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L66)

___

### useful

▸ **useful**(): `boolean`

Is Current Dispatcher in Use

#### Returns

`boolean`

#### Defined in

[eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L226)
