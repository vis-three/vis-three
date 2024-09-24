# Interface: LoaderMappingEngine

[strategy/LoaderMappingStrategy](../modules/strategy_LoaderMappingStrategy.md).LoaderMappingEngine

## Hierarchy

- [`ResourceManagerEngine`](plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

  ↳ **`LoaderMappingEngine`**

## Implemented by

- [`EngineSupport`](../classes/engine.EngineSupport.md)

## Properties

### camera

• **camera**: `Camera`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[camera](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#camera)

#### Defined in

[packages/core/engine/index.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L67)

___

### dom

• **dom**: `HTMLElement`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[dom](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#dom)

#### Defined in

[packages/core/engine/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L66)

___

### loadResources

• **loadResources**: (`urlList`: `LoadUnit`[], `callback`: (`err`: `undefined` \| `Error`, `event?`: [`MappedEvent`](plugin_ResourceManagerPlugin.MappedEvent.md)) => `void`) => [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Type declaration

▸ (`urlList`, `callback`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `urlList` | `LoadUnit`[] |
| `callback` | (`err`: `undefined` \| `Error`, `event?`: [`MappedEvent`](plugin_ResourceManagerPlugin.MappedEvent.md)) => `void` |

##### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Defined in

[packages/middleware/strategy/LoaderMappingStrategy/index.ts:18](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/strategy/LoaderMappingStrategy/index.ts#L18)

___

### loadResourcesAsync

• **loadResourcesAsync**: (`urlList`: `LoadUnit`[]) => `Promise`<[`MappedEvent`](plugin_ResourceManagerPlugin.MappedEvent.md)\>

#### Type declaration

▸ (`urlList`): `Promise`<[`MappedEvent`](plugin_ResourceManagerPlugin.MappedEvent.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `urlList` | `LoadUnit`[] |

##### Returns

`Promise`<[`MappedEvent`](plugin_ResourceManagerPlugin.MappedEvent.md)\>

#### Defined in

[packages/middleware/strategy/LoaderMappingStrategy/index.ts:22](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/strategy/LoaderMappingStrategy/index.ts#L22)

___

### loaderManager

• **loaderManager**: `LoaderManager`

#### Defined in

[packages/middleware/strategy/LoaderMappingStrategy/index.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/strategy/LoaderMappingStrategy/index.ts#L17)

___

### pluginTables

• **pluginTables**: `Map`<`string`, `PluginOptions`<`Engine`\>\>

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[pluginTables](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#plugintables)

#### Defined in

[packages/core/engine/index.ts:63](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L63)

___

### registerResources

• **registerResources**: (`resourceMap`: `Record`<`string`, `unknown`\>) => [`ResourceManagerEngine`](plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

#### Type declaration

▸ (`resourceMap`): [`ResourceManagerEngine`](plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `resourceMap` | `Record`<`string`, `unknown`\> |

##### Returns

[`ResourceManagerEngine`](plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[registerResources](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#registerresources)

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/index.ts#L12)

___

### resourceManager

• **resourceManager**: [`ResourceManager`](../classes/plugin_ResourceManagerPlugin.ResourceManager.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[resourceManager](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#resourcemanager)

#### Defined in

[packages/middleware/plugin/ResourceManagerPlugin/index.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/ResourceManagerPlugin/index.ts#L11)

___

### scene

• **scene**: `Scene`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[scene](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#scene)

#### Defined in

[packages/core/engine/index.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L68)

___

### strategyTables

• **strategyTables**: `Map`<`string`, `StrategyOptions`<`Engine`\>\>

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[strategyTables](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#strategytables)

#### Defined in

[packages/core/engine/index.ts:64](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L64)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[addEventListener](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#addeventlistener)

#### Defined in

[packages/core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[clear](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#clear)

#### Defined in

[packages/core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L218)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[dispatchEvent](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#dispatchevent)

#### Defined in

[packages/core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

清除引擎缓存

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

this

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[dispose](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#dispose)

#### Defined in

[packages/core/engine/index.ts:300](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L300)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[emit](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#emit)

#### Defined in

[packages/core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L134)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[eventCount](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#eventcount)

#### Defined in

[packages/core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L195)

___

### exec

▸ **exec**<`E`\>(`strategy`): `E`

执行策略

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `Engine`<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `strategy` | `StrategyOptions`<`E`\> |

#### Returns

`E`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[exec](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#exec)

#### Defined in

[packages/core/engine/index.ts:166](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L166)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[has](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#has)

#### Defined in

[packages/core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L165)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[hasEventListener](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#haseventlistener)

#### Defined in

[packages/core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L48)

___

### install

▸ **install**<`E`\>(`plugin`): `E`

安装插件

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `Engine`<`E`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `plugin` | `PluginOptions`<`E`\> |

#### Returns

`E`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[install](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#install)

#### Defined in

[packages/core/engine/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L82)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[off](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#off)

#### Defined in

[packages/core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L178)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[on](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#on)

#### Defined in

[packages/core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L155)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[once](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#once)

#### Defined in

[packages/core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L120)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[popLatestEvent](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#poplatestevent)

#### Defined in

[packages/core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L207)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[removeEvent](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#removeevent)

#### Defined in

[packages/core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L89)

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

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[removeEventListener](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#removeeventlistener)

#### Defined in

[packages/core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L66)

___

### render

▸ **render**(`delta`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

渲染方法

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[render](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#render)

#### Defined in

[packages/core/engine/index.ts:288](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L288)

___

### rollback

▸ **rollback**(`name`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

回滚策略

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[rollback](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#rollback)

#### Defined in

[packages/core/engine/index.ts:194](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L194)

___

### setCamera

▸ **setCamera**(`camera`, `options?`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

设置当前相机

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `options?` | `SetCameraOptions` |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[setCamera](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#setcamera)

#### Defined in

[packages/core/engine/index.ts:248](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L248)

___

### setDom

▸ **setDom**(`dom`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

设置输出的dom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dom` | `HTMLElement` | HTMLElement |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

this

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[setDom](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#setdom)

#### Defined in

[packages/core/engine/index.ts:213](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L213)

___

### setScene

▸ **setScene**(`scene`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

设置渲染场景

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[setScene](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#setscene)

#### Defined in

[packages/core/engine/index.ts:271](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L271)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

设置引擎整体尺寸

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width?` | `number` | number |
| `height?` | `number` | number |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

this

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[setSize](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#setsize)

#### Defined in

[packages/core/engine/index.ts:228](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L228)

___

### uninstall

▸ **uninstall**(`name`): [`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

卸载插件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`LoaderMappingEngine`](strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[uninstall](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#uninstall)

#### Defined in

[packages/core/engine/index.ts:124](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L124)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

[ResourceManagerEngine](plugin_ResourceManagerPlugin.ResourceManagerEngine.md).[useful](plugin_ResourceManagerPlugin.ResourceManagerEngine.md#useful)

#### Defined in

[packages/core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L226)
