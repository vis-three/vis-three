# Interface: DataSupportEngine

[plugin/DataSupportManagerPlugin](../modules/plugin_DataSupportManagerPlugin.md).DataSupportEngine

## Hierarchy

- `Engine`

  ↳ **`DataSupportEngine`**

  ↳↳ [`LoaderDataSupportEngine`](strategy_LoaderDataSuportStrategy.LoaderDataSupportEngine.md)

## Implemented by

- [`EngineSupport`](../classes/engine.EngineSupport.md)

## Properties

### applyConfig

• **applyConfig**: (...`args`: [`SymbolConfig`](module.SymbolConfig.md)[]) => [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Type declaration

▸ (`...args`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`SymbolConfig`](module.SymbolConfig.md)[] |

##### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/index.ts:8](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/index.ts#L8)

___

### camera

• **camera**: `Camera`

#### Inherited from

Engine.camera

#### Defined in

[packages/core/engine/index.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L67)

___

### dataSupportManager

• **dataSupportManager**: [`DataSupportManager`](../classes/plugin_DataSupportManagerPlugin.DataSupportManager.md)

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/index.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/index.ts#L7)

___

### dom

• **dom**: `HTMLElement`

#### Inherited from

Engine.dom

#### Defined in

[packages/core/engine/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L66)

___

### exportConfig

• **exportConfig**: () => [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

#### Type declaration

▸ (): [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

##### Returns

[`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/index.ts:12](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/index.ts#L12)

___

### getConfigBySymbol

• **getConfigBySymbol**: (`vid`: `string`) => ``null`` \| [`SymbolConfig`](module.SymbolConfig.md)

#### Type declaration

▸ (`vid`): ``null`` \| [`SymbolConfig`](module.SymbolConfig.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

##### Returns

``null`` \| [`SymbolConfig`](module.SymbolConfig.md)

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/index.ts:9](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/index.ts#L9)

___

### pluginTables

• **pluginTables**: `Map`<`string`, `PluginOptions`<`Engine`\>\>

#### Inherited from

Engine.pluginTables

#### Defined in

[packages/core/engine/index.ts:63](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L63)

___

### removeConfigBySymbol

• **removeConfigBySymbol**: (...`args`: `string`[]) => [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Type declaration

▸ (`...args`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `string`[] |

##### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/index.ts#L10)

___

### scene

• **scene**: `Scene`

#### Inherited from

Engine.scene

#### Defined in

[packages/core/engine/index.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L68)

___

### strategyTables

• **strategyTables**: `Map`<`string`, `StrategyOptions`<`Engine`\>\>

#### Inherited from

Engine.strategyTables

#### Defined in

[packages/core/engine/index.ts:64](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L64)

___

### toJSON

• **toJSON**: () => `string`

#### Type declaration

▸ (): `string`

##### Returns

`string`

#### Defined in

[packages/middleware/plugin/DataSupportManagerPlugin/index.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/plugin/DataSupportManagerPlugin/index.ts#L11)

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

Engine.addEventListener

#### Defined in

[packages/core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L23)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

Engine.clear

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

Engine.dispatchEvent

#### Defined in

[packages/core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

清除引擎缓存

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

this

#### Inherited from

Engine.dispose

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

Engine.emit

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

Engine.eventCount

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

Engine.exec

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

Engine.has

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

Engine.hasEventListener

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

Engine.install

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

Engine.off

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

Engine.on

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

Engine.once

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

Engine.popLatestEvent

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

Engine.removeEvent

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

Engine.removeEventListener

#### Defined in

[packages/core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L66)

___

### render

▸ **render**(`delta`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

渲染方法

#### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Inherited from

Engine.render

#### Defined in

[packages/core/engine/index.ts:288](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L288)

___

### rollback

▸ **rollback**(`name`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

回滚策略

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Inherited from

Engine.rollback

#### Defined in

[packages/core/engine/index.ts:194](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L194)

___

### setCamera

▸ **setCamera**(`camera`, `options?`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

设置当前相机

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `options?` | `SetCameraOptions` |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Inherited from

Engine.setCamera

#### Defined in

[packages/core/engine/index.ts:248](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L248)

___

### setDom

▸ **setDom**(`dom`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

设置输出的dom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dom` | `HTMLElement` | HTMLElement |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

this

#### Inherited from

Engine.setDom

#### Defined in

[packages/core/engine/index.ts:213](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L213)

___

### setScene

▸ **setScene**(`scene`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

设置渲染场景

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Inherited from

Engine.setScene

#### Defined in

[packages/core/engine/index.ts:271](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L271)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

设置引擎整体尺寸

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width?` | `number` | number |
| `height?` | `number` | number |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

this

#### Inherited from

Engine.setSize

#### Defined in

[packages/core/engine/index.ts:228](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L228)

___

### uninstall

▸ **uninstall**(`name`): [`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

卸载插件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`DataSupportEngine`](plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Inherited from

Engine.uninstall

#### Defined in

[packages/core/engine/index.ts:124](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L124)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

Engine.useful

#### Defined in

[packages/core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L226)
