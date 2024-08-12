# Class: Engine

[engine](../modules/engine.md).Engine

## Hierarchy

- [`EventDispatcher`](eventDispatcher.EventDispatcher.md)

  ↳ **`Engine`**

## Constructors

### constructor

• **new Engine**()

#### Overrides

[EventDispatcher](eventDispatcher.EventDispatcher.md).[constructor](eventDispatcher.EventDispatcher.md#constructor)

#### Defined in

[engine/index.ts:70](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L70)

## Properties

### camera

• **camera**: `Camera`

#### Defined in

[engine/index.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L67)

___

### dom

• **dom**: `HTMLElement`

#### Defined in

[engine/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L66)

___

### pluginTables

• **pluginTables**: `Map`<`string`, [`PluginOptions`](../interfaces/plugin.PluginOptions.md)<[`Engine`](engine.Engine.md)\>\>

#### Defined in

[engine/index.ts:63](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L63)

___

### scene

• **scene**: `Scene`

#### Defined in

[engine/index.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L68)

___

### strategyTables

• **strategyTables**: `Map`<`string`, [`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<[`Engine`](engine.Engine.md)\>\>

#### Defined in

[engine/index.ts:64](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L64)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[addEventListener](eventDispatcher.EventDispatcher.md#addeventlistener)

#### Defined in

[eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

Clear All Events

#### Returns

`void`

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[clear](eventDispatcher.EventDispatcher.md#clear)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[dispatchEvent](eventDispatcher.EventDispatcher.md#dispatchevent)

#### Defined in

[eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): [`Engine`](engine.Engine.md)

Clear Engine Cache

#### Returns

[`Engine`](engine.Engine.md)

this

#### Defined in

[engine/index.ts:300](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L300)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[emit](eventDispatcher.EventDispatcher.md#emit)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[eventCount](eventDispatcher.EventDispatcher.md#eventcount)

#### Defined in

[eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L195)

___

### exec

▸ **exec**<`E`\>(`strategy`): `E`

Execute Strategy

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](engine.Engine.md)<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | [`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<`E`\> |

#### Returns

`E`

#### Defined in

[engine/index.ts:166](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L166)

___

### has

▸ **has**<`C`\>(`type`, `listener`): `boolean`

Has Event?

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[has](eventDispatcher.EventDispatcher.md#has)

#### Defined in

[eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L165)

___

### hasEventListener

▸ **hasEventListener**<`C`\>(`type`, `listener`): `boolean`

是否有此事件

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[hasEventListener](eventDispatcher.EventDispatcher.md#haseventlistener)

#### Defined in

[eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L48)

___

### install

▸ **install**<`E`\>(`plugin`): `E`

Install Plugin

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](engine.Engine.md)<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | [`PluginOptions`](../interfaces/plugin.PluginOptions.md)<`E`\> |

#### Returns

`E`

#### Defined in

[engine/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L82)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[off](eventDispatcher.EventDispatcher.md#off)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[on](eventDispatcher.EventDispatcher.md#on)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[once](eventDispatcher.EventDispatcher.md#once)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[popLatestEvent](eventDispatcher.EventDispatcher.md#poplatestevent)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[removeEvent](eventDispatcher.EventDispatcher.md#removeevent)

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

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[removeEventListener](eventDispatcher.EventDispatcher.md#removeeventlistener)

#### Defined in

[eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L66)

___

### render

▸ **render**(`delta`): [`Engine`](engine.Engine.md)

Rendering Method

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:288](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L288)

___

### rollback

▸ **rollback**(`name`): [`Engine`](engine.Engine.md)

Rollback Strategy

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:194](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L194)

___

### setCamera

▸ **setCamera**(`camera`, `options?`): [`Engine`](engine.Engine.md)

Set Current Camera

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `options?` | [`SetCameraOptions`](../interfaces/engine.SetCameraOptions.md) |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:248](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L248)

___

### setDom

▸ **setDom**(`dom`): [`Engine`](engine.Engine.md)

Set Output DOM

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dom` | `HTMLElement` | HTMLElement |

#### Returns

[`Engine`](engine.Engine.md)

this

#### Defined in

[engine/index.ts:213](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L213)

___

### setScene

▸ **setScene**(`scene`): [`Engine`](engine.Engine.md)

Set Rendering Scene

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:271](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L271)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`Engine`](engine.Engine.md)

Set Engine Overall Size

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width?` | `number` | number |
| `height?` | `number` | number |

#### Returns

[`Engine`](engine.Engine.md)

this

#### Defined in

[engine/index.ts:228](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L228)

___

### uninstall

▸ **uninstall**(`name`): [`Engine`](engine.Engine.md)

Uninstall Plugin

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:124](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L124)

___

### useful

▸ **useful**(): `boolean`

Is Current Dispatcher in Use

#### Returns

`boolean`

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[useful](eventDispatcher.EventDispatcher.md#useful)

#### Defined in

[eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L226)
