# Class: Engine

[engine](../modules/engine.md).Engine

## Hierarchy

- [`EventDispatcher`](eventDispatcher.EventDispatcher.md)

  ↳ **`Engine`**

## Table of contents

### Constructors

- [constructor](engine.Engine.md#constructor)

### Properties

- [camera](engine.Engine.md#camera)
- [dom](engine.Engine.md#dom)
- [pluginTables](engine.Engine.md#plugintables)
- [scene](engine.Engine.md#scene)
- [strategyTables](engine.Engine.md#strategytables)

### Methods

- [addEventListener](engine.Engine.md#addeventlistener)
- [clear](engine.Engine.md#clear)
- [dispatchEvent](engine.Engine.md#dispatchevent)
- [dispose](engine.Engine.md#dispose)
- [emit](engine.Engine.md#emit)
- [eventCount](engine.Engine.md#eventcount)
- [exec](engine.Engine.md#exec)
- [has](engine.Engine.md#has)
- [hasEventListener](engine.Engine.md#haseventlistener)
- [install](engine.Engine.md#install)
- [off](engine.Engine.md#off)
- [on](engine.Engine.md#on)
- [once](engine.Engine.md#once)
- [popLatestEvent](engine.Engine.md#poplatestevent)
- [removeEvent](engine.Engine.md#removeevent)
- [removeEventListener](engine.Engine.md#removeeventlistener)
- [render](engine.Engine.md#render)
- [rollback](engine.Engine.md#rollback)
- [setCamera](engine.Engine.md#setcamera)
- [setDom](engine.Engine.md#setdom)
- [setScene](engine.Engine.md#setscene)
- [setSize](engine.Engine.md#setsize)
- [uninstall](engine.Engine.md#uninstall)
- [useful](engine.Engine.md#useful)

## Constructors

### constructor

• **new Engine**()

#### Overrides

[EventDispatcher](eventDispatcher.EventDispatcher.md).[constructor](eventDispatcher.EventDispatcher.md#constructor)

#### Defined in

[engine/index.ts:75](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L75)

## Properties

### camera

• **camera**: `Camera`

#### Defined in

[engine/index.ts:72](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L72)

___

### dom

• **dom**: `HTMLElement`

#### Defined in

[engine/index.ts:71](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L71)

___

### pluginTables

• **pluginTables**: `Map`<`string`, [`PluginOptions`](../interfaces/plugin.PluginOptions.md)<[`Engine`](engine.Engine.md)\>\>

#### Defined in

[engine/index.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L68)

___

### scene

• **scene**: `Scene`

#### Defined in

[engine/index.ts:73](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L73)

___

### strategyTables

• **strategyTables**: `Map`<`string`, [`StrategyOptions`](../interfaces/strategy.StrategyOptions.md)<[`Engine`](engine.Engine.md)\>\>

#### Defined in

[engine/index.ts:69](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L69)

## Methods

### addEventListener

▸ **addEventListener**<`C`\>(`type`, `listener`): `void`

添加事件

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

[eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[clear](eventDispatcher.EventDispatcher.md#clear)

#### Defined in

[eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L218)

___

### dispatchEvent

▸ **dispatchEvent**<`C`\>(`event`): `void`

触发事件

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

[eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): [`Engine`](engine.Engine.md)

清除引擎缓存

#### Returns

[`Engine`](engine.Engine.md)

this

#### Defined in

[engine/index.ts:305](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L305)

___

### emit

▸ **emit**<`C`\>(`name`, `params?`): `void`

触发事件

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

[eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L134)

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

[EventDispatcher](eventDispatcher.EventDispatcher.md).[eventCount](eventDispatcher.EventDispatcher.md#eventcount)

#### Defined in

[eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L195)

___

### exec

▸ **exec**<`E`\>(`strategy`): `E`

执行策略

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

[engine/index.ts:171](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L171)

___

### has

▸ **has**<`C`\>(`type`, `listener`): `boolean`

是否有此事件

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

[eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L165)

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

[eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L48)

___

### install

▸ **install**<`E`\>(`plugin`): `E`

安装插件

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

[engine/index.ts:87](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L87)

___

### off

▸ **off**<`C`\>(`type`, `listener?`): `void`

移除事件

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

[eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L178)

___

### on

▸ **on**<`C`\>(`type`, `listener`): `void`

订阅事件

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

[eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L155)

___

### once

▸ **once**<`C`\>(`type`, `listener`): `void`

一次性事件触发

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

[eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L120)

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

[EventDispatcher](eventDispatcher.EventDispatcher.md).[popLatestEvent](eventDispatcher.EventDispatcher.md#poplatestevent)

#### Defined in

[eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L207)

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

[EventDispatcher](eventDispatcher.EventDispatcher.md).[removeEvent](eventDispatcher.EventDispatcher.md#removeevent)

#### Defined in

[eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L89)

___

### removeEventListener

▸ **removeEventListener**<`C`\>(`type`, `listener`): `void`

移除事件

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

[eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L66)

___

### render

▸ **render**(`delta`): [`Engine`](engine.Engine.md)

渲染方法

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:293](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L293)

___

### rollback

▸ **rollback**(`name`): [`Engine`](engine.Engine.md)

回滚策略

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:199](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L199)

___

### setCamera

▸ **setCamera**(`camera`, `options?`): [`Engine`](engine.Engine.md)

设置当前相机

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `options?` | [`SetCameraOptions`](../interfaces/engine.SetCameraOptions.md) |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:253](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L253)

___

### setDom

▸ **setDom**(`dom`): [`Engine`](engine.Engine.md)

设置输出的dom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dom` | `HTMLElement` | HTMLElement |

#### Returns

[`Engine`](engine.Engine.md)

this

#### Defined in

[engine/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L218)

___

### setScene

▸ **setScene**(`scene`): [`Engine`](engine.Engine.md)

设置渲染场景

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:276](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L276)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`Engine`](engine.Engine.md)

设置引擎整体尺寸

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width?` | `number` | number |
| `height?` | `number` | number |

#### Returns

[`Engine`](engine.Engine.md)

this

#### Defined in

[engine/index.ts:233](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L233)

___

### uninstall

▸ **uninstall**(`name`): [`Engine`](engine.Engine.md)

卸载插件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Engine`](engine.Engine.md)

#### Defined in

[engine/index.ts:129](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/engine/index.ts#L129)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

[EventDispatcher](eventDispatcher.EventDispatcher.md).[useful](eventDispatcher.EventDispatcher.md#useful)

#### Defined in

[eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/eventDispatcher/index.ts#L226)
