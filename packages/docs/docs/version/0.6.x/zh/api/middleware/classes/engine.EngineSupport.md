# Class: EngineSupport

[engine](../modules/engine.md).EngineSupport

## Hierarchy

- `Engine`

  ↳ **`EngineSupport`**

## Implements

- `PointerManagerEngine`
- `EventManagerEngine`
- `RenderManagerEngine`
- [`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)
- [`CompilerManagerEngine`](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md)
- [`LoaderMappingEngine`](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md)

## Constructors

### constructor

• **new EngineSupport**()

#### Overrides

Engine.constructor

#### Defined in

[packages/middleware/engine/index.ts:125](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L125)

## Properties

### applyConfig

• **applyConfig**: (...`args`: [`SymbolConfig`](../interfaces/module.SymbolConfig.md)[]) => [`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Type declaration

▸ (`...args`): [`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | [`SymbolConfig`](../interfaces/module.SymbolConfig.md)[] |

##### Returns

[`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Implementation of

[DataSupportEngine](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md).[applyConfig](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md#applyconfig)

#### Defined in

[packages/middleware/engine/index.ts:98](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L98)

___

### camera

• **camera**: `Camera`

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[camera](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#camera)

#### Inherited from

Engine.camera

#### Defined in

[packages/core/engine/index.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L67)

___

### compilerManager

• **compilerManager**: [`CompilerManager`](plugin_CompilerManagerPlugin.CompilerManager.md)

#### Implementation of

[CompilerManagerEngine](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md).[compilerManager](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md#compilermanager)

#### Defined in

[packages/middleware/engine/index.ts:103](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L103)

___

### dataSupportManager

• **dataSupportManager**: [`DataSupportManager`](plugin_DataSupportManagerPlugin.DataSupportManager.md)

#### Implementation of

[DataSupportEngine](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md).[dataSupportManager](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md#datasupportmanager)

#### Defined in

[packages/middleware/engine/index.ts:97](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L97)

___

### dom

• **dom**: `HTMLElement`

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[dom](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#dom)

#### Inherited from

Engine.dom

#### Defined in

[packages/core/engine/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L66)

___

### eventManager

• **eventManager**: `EventManager`

#### Implementation of

EventManagerEngine.eventManager

#### Defined in

[packages/middleware/engine/index.ts:87](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L87)

___

### exportConfig

• **exportConfig**: () => [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

#### Type declaration

▸ (): [`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

##### Returns

[`LoadOptions`](../modules/plugin_DataSupportManagerPlugin.md#loadoptions)

#### Implementation of

[DataSupportEngine](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md).[exportConfig](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md#exportconfig)

#### Defined in

[packages/middleware/engine/index.ts:102](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L102)

___

### getConfigBySymbol

• **getConfigBySymbol**: (`vid`: `string`) => ``null`` \| [`SymbolConfig`](../interfaces/module.SymbolConfig.md)

#### Type declaration

▸ (`vid`): ``null`` \| [`SymbolConfig`](../interfaces/module.SymbolConfig.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

##### Returns

``null`` \| [`SymbolConfig`](../interfaces/module.SymbolConfig.md)

#### Implementation of

[DataSupportEngine](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md).[getConfigBySymbol](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md#getconfigbysymbol)

#### Defined in

[packages/middleware/engine/index.ts:99](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L99)

___

### getObject3D

• **getObject3D**: (`vid`: `string`) => ``null`` \| `Object3D`<`Event`\>

#### Type declaration

▸ (`vid`): ``null`` \| `Object3D`<`Event`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

##### Returns

``null`` \| `Object3D`<`Event`\>

#### Implementation of

[CompilerManagerEngine](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md).[getObject3D](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md#getobject3d)

#### Defined in

[packages/middleware/engine/index.ts:116](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L116)

___

### getObjectBySymbol

• **getObjectBySymbol**: (`vid`: `string`) => `any`

#### Type declaration

▸ (`vid`): `any`

##### Parameters

| Name | Type |
| :------ | :------ |
| `vid` | `string` |

##### Returns

`any`

#### Implementation of

[CompilerManagerEngine](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md).[getObjectBySymbol](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md#getobjectbysymbol)

#### Defined in

[packages/middleware/engine/index.ts:105](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L105)

___

### getObjectSymbol

• **getObjectSymbol**: (`object`: `any`) => ``null`` \| `string`

#### Type declaration

▸ (`object`): ``null`` \| `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

##### Returns

``null`` \| `string`

#### Implementation of

[CompilerManagerEngine](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md).[getObjectSymbol](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md#getobjectsymbol)

#### Defined in

[packages/middleware/engine/index.ts:104](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L104)

___

### getObjectfromModule

• **getObjectfromModule**: (`module`: `string`, `vid`: `string`) => ``null`` \| `object`

#### Type declaration

▸ (`module`, `vid`): ``null`` \| `object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `module` | `string` |
| `vid` | `string` |

##### Returns

``null`` \| `object`

#### Implementation of

[CompilerManagerEngine](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md).[getObjectfromModule](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md#getobjectfrommodule)

#### Defined in

[packages/middleware/engine/index.ts:111](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L111)

___

### getObjectfromModules

• **getObjectfromModules**: (`modules`: `string`[] \| `Record`<`string`, `any`\>, `vid`: `string`) => ``null`` \| `object`

#### Type declaration

▸ (`modules`, `vid`): ``null`` \| `object`

##### Parameters

| Name | Type |
| :------ | :------ |
| `modules` | `string`[] \| `Record`<`string`, `any`\> |
| `vid` | `string` |

##### Returns

``null`` \| `object`

#### Implementation of

[CompilerManagerEngine](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md).[getObjectfromModules](../interfaces/plugin_CompilerManagerPlugin.CompilerManagerEngine.md#getobjectfrommodules)

#### Defined in

[packages/middleware/engine/index.ts:112](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L112)

___

### loadResources

• **loadResources**: (`urlList`: `LoadUnit`[], `callback`: (`err`: `undefined` \| `Error`, `event?`: [`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)) => `void`) => [`EngineSupport`](engine.EngineSupport.md)

#### Type declaration

▸ (`urlList`, `callback`): [`EngineSupport`](engine.EngineSupport.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `urlList` | `LoadUnit`[] |
| `callback` | (`err`: `undefined` \| `Error`, `event?`: [`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)) => `void` |

##### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[loadResources](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#loadresources)

#### Defined in

[packages/middleware/engine/index.ts:106](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L106)

___

### loadResourcesAsync

• **loadResourcesAsync**: (`urlList`: `LoadUnit`[]) => `Promise`<[`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)\>

#### Type declaration

▸ (`urlList`): `Promise`<[`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `urlList` | `LoadUnit`[] |

##### Returns

`Promise`<[`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)\>

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[loadResourcesAsync](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#loadresourcesasync)

#### Defined in

[packages/middleware/engine/index.ts:110](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L110)

___

### loaderManager

• **loaderManager**: `LoaderManager`

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[loaderManager](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#loadermanager)

#### Defined in

[packages/middleware/engine/index.ts:86](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L86)

___

### moduleLifeCycle

• `Private` **moduleLifeCycle**: { `module`: `string` ; `order`: `number`  }[] = `[]`

#### Defined in

[packages/middleware/engine/index.ts:118](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L118)

___

### play

• **play**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Implementation of

RenderManagerEngine.play

#### Defined in

[packages/middleware/engine/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L89)

___

### pluginTables

• **pluginTables**: `Map`<`string`, `PluginOptions`<`Engine`\>\>

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[pluginTables](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#plugintables)

#### Inherited from

Engine.pluginTables

#### Defined in

[packages/core/engine/index.ts:63](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L63)

___

### pointerManager

• **pointerManager**: `PointerManager`

#### Implementation of

PointerManagerEngine.pointerManager

#### Defined in

[packages/middleware/engine/index.ts:92](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L92)

___

### processorExpands

• `Private` **processorExpands**: { `command`: [`ProcessorCommands`](../interfaces/module.ProcessorCommands.md)<`any`, `any`, `any`, `any`\> ; `processors`: `RegExp` \| `string`[]  }[] = `[]`

#### Defined in

[packages/middleware/engine/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L120)

___

### registerResources

• **registerResources**: (`resourceMap`: `Record`<`string`, `unknown`\>) => [`ResourceManagerEngine`](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

#### Type declaration

▸ (`resourceMap`): [`ResourceManagerEngine`](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `resourceMap` | `Record`<`string`, `unknown`\> |

##### Returns

[`ResourceManagerEngine`](../interfaces/plugin_ResourceManagerPlugin.ResourceManagerEngine.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[registerResources](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#registerresources)

#### Defined in

[packages/middleware/engine/index.ts:94](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L94)

___

### removeConfigBySymbol

• **removeConfigBySymbol**: (...`args`: `string`[]) => [`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Type declaration

▸ (`...args`): [`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `string`[] |

##### Returns

[`DataSupportEngine`](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md)

#### Implementation of

[DataSupportEngine](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md).[removeConfigBySymbol](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md#removeconfigbysymbol)

#### Defined in

[packages/middleware/engine/index.ts:100](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L100)

___

### render

• **render**: (`delta`: `number`) => [`EngineSupport`](engine.EngineSupport.md)

#### Type declaration

▸ (`delta`): [`EngineSupport`](engine.EngineSupport.md)

##### Parameters

| Name | Type |
| :------ | :------ |
| `delta` | `number` |

##### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[render](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#render)

#### Overrides

Engine.render

#### Defined in

[packages/middleware/engine/index.ts:91](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L91)

___

### renderManager

• **renderManager**: `RenderManager`

#### Implementation of

RenderManagerEngine.renderManager

#### Defined in

[packages/middleware/engine/index.ts:88](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L88)

___

### resourceManager

• **resourceManager**: [`ResourceManager`](plugin_ResourceManagerPlugin.ResourceManager.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[resourceManager](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#resourcemanager)

#### Defined in

[packages/middleware/engine/index.ts:93](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L93)

___

### scene

• **scene**: `Scene`

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[scene](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#scene)

#### Inherited from

Engine.scene

#### Defined in

[packages/core/engine/index.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L68)

___

### stop

• **stop**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Implementation of

RenderManagerEngine.stop

#### Defined in

[packages/middleware/engine/index.ts:90](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L90)

___

### strategyTables

• **strategyTables**: `Map`<`string`, `StrategyOptions`<`Engine`\>\>

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[strategyTables](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#strategytables)

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

#### Implementation of

[DataSupportEngine](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md).[toJSON](../interfaces/plugin_DataSupportManagerPlugin.DataSupportEngine.md#tojson)

#### Defined in

[packages/middleware/engine/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L101)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[addEventListener](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#addeventlistener)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[clear](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#clear)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[dispatchEvent](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#dispatchevent)

#### Inherited from

Engine.dispatchEvent

#### Defined in

[packages/core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): [`EngineSupport`](engine.EngineSupport.md)

清除引擎缓存

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

this

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[dispose](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#dispose)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[emit](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#emit)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[eventCount](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#eventcount)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[exec](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#exec)

#### Inherited from

Engine.exec

#### Defined in

[packages/core/engine/index.ts:166](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L166)

___

### getObjectConfig

▸ **getObjectConfig**<`O`, `C`\>(`object`): ``null`` \| `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | `O` |
| `C` | extends [`SymbolConfig`](../interfaces/module.SymbolConfig.md) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `O` |

#### Returns

``null`` \| `C`

#### Defined in

[packages/middleware/engine/index.ts:248](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L248)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[has](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#has)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[hasEventListener](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#haseventlistener)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[install](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#install)

#### Inherited from

Engine.install

#### Defined in

[packages/core/engine/index.ts:82](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L82)

___

### loadConfig

▸ **loadConfig**(`config`, `callback?`): [`EngineSupport`](engine.EngineSupport.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EngineSupportLoadOptions`](../modules/engine.md#enginesupportloadoptions) |
| `callback?` | (`event?`: [`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)) => `void` |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Defined in

[packages/middleware/engine/index.ts:169](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L169)

___

### loadConfigAsync

▸ **loadConfigAsync**(`config`): `Promise`<`undefined` \| [`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EngineSupportLoadOptions`](../modules/engine.md#enginesupportloadoptions) |

#### Returns

`Promise`<`undefined` \| [`MappedEvent`](../interfaces/plugin_ResourceManagerPlugin.MappedEvent.md)\>

#### Defined in

[packages/middleware/engine/index.ts:210](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L210)

___

### loadLifeCycle

▸ `Private` **loadLifeCycle**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | `Omit`<[`EngineSupportLoadOptions`](../modules/engine.md#enginesupportloadoptions), ``"assets"``\> |

#### Returns

`void`

#### Defined in

[packages/middleware/engine/index.ts:140](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L140)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[off](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#off)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[on](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#on)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[once](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#once)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[popLatestEvent](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#poplatestevent)

#### Inherited from

Engine.popLatestEvent

#### Defined in

[packages/core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L207)

___

### registModule

▸ **registModule**<`C`\>(`options`): [`EngineSupport`](engine.EngineSupport.md)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends [`Compiler`](module.Compiler.md)<`any`, `any`, `C`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ModuleOptions`](../interfaces/module.ModuleOptions.md)<`C`\> |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Defined in

[packages/middleware/engine/index.ts:258](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L258)

___

### removeConfig

▸ **removeConfig**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EngineSupportLoadOptions`](../modules/engine.md#enginesupportloadoptions) |

#### Returns

`void`

#### Defined in

[packages/middleware/engine/index.ts:244](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L244)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[removeEvent](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#removeevent)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[removeEventListener](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#removeeventlistener)

#### Inherited from

Engine.removeEventListener

#### Defined in

[packages/core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L66)

___

### removeLifeCycle

▸ `Private` **removeLifeCycle**(`config`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`EngineSupportLoadOptions`](../modules/engine.md#enginesupportloadoptions) |

#### Returns

`void`

#### Defined in

[packages/middleware/engine/index.ts:150](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/engine/index.ts#L150)

___

### rollback

▸ **rollback**(`name`): [`EngineSupport`](engine.EngineSupport.md)

回滚策略

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[rollback](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#rollback)

#### Inherited from

Engine.rollback

#### Defined in

[packages/core/engine/index.ts:194](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L194)

___

### setCamera

▸ **setCamera**(`camera`, `options?`): [`EngineSupport`](engine.EngineSupport.md)

设置当前相机

#### Parameters

| Name | Type |
| :------ | :------ |
| `camera` | `Camera` |
| `options?` | `SetCameraOptions` |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[setCamera](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#setcamera)

#### Inherited from

Engine.setCamera

#### Defined in

[packages/core/engine/index.ts:248](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L248)

___

### setDom

▸ **setDom**(`dom`): [`EngineSupport`](engine.EngineSupport.md)

设置输出的dom

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `dom` | `HTMLElement` | HTMLElement |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

this

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[setDom](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#setdom)

#### Inherited from

Engine.setDom

#### Defined in

[packages/core/engine/index.ts:213](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L213)

___

### setScene

▸ **setScene**(`scene`): [`EngineSupport`](engine.EngineSupport.md)

设置渲染场景

#### Parameters

| Name | Type |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[setScene](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#setscene)

#### Inherited from

Engine.setScene

#### Defined in

[packages/core/engine/index.ts:271](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L271)

___

### setSize

▸ **setSize**(`width?`, `height?`): [`EngineSupport`](engine.EngineSupport.md)

设置引擎整体尺寸

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width?` | `number` | number |
| `height?` | `number` | number |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

this

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[setSize](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#setsize)

#### Inherited from

Engine.setSize

#### Defined in

[packages/core/engine/index.ts:228](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/engine/index.ts#L228)

___

### uninstall

▸ **uninstall**(`name`): [`EngineSupport`](engine.EngineSupport.md)

卸载插件

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`EngineSupport`](engine.EngineSupport.md)

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[uninstall](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#uninstall)

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

#### Implementation of

[LoaderMappingEngine](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md).[useful](../interfaces/strategy_LoaderMappingStrategy.LoaderMappingEngine.md#useful)

#### Inherited from

Engine.useful

#### Defined in

[packages/core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/core/eventDispatcher/index.ts#L226)
