# Class: LoaderManager

## Hierarchy

- `EventDispatcher`

  ↳ **`LoaderManager`**

## Constructors

### constructor

• **new LoaderManager**(`parameters?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `parameters?` | [`LoaderManagerParameters`](../interfaces/LoaderManagerParameters.md) |

#### Overrides

EventDispatcher.constructor

#### Defined in

[plugins/loaderManager/LoaderManager.ts:77](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L77)

## Properties

### isError

• `Private` **isError**: `boolean`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:70](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L70)

___

### isLoaded

• `Private` **isLoaded**: `boolean`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:72](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L72)

___

### isLoading

• `Private` **isLoading**: `boolean`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:71](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L71)

___

### loadDetailMap

• `Private` **loadDetailMap**: `Object`

#### Index signature

▪ [key: `string`]: [`LoadDetail`](../interfaces/LoadDetail.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:73](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L73)

___

### loadError

• `Private` **loadError**: `number`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:69](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L69)

___

### loadSuccess

• `Private` **loadSuccess**: `number`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:68](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L68)

___

### loadTotal

• `Private` **loadTotal**: `number`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:67](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L67)

___

### loaderMap

• `Private` **loaderMap**: `Object`

#### Index signature

▪ [key: `string`]: `Loader`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:65](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L65)

___

### path

• **path**: `string` = `""`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:75](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L75)

___

### resourceMap

• `Private` **resourceMap**: `Map`<`string`, `unknown`\>

#### Defined in

[plugins/loaderManager/LoaderManager.ts:64](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L64)

___

### urlList

• `Private` **urlList**: [`LoadUnit`](../modules.md#loadunit)[] = `[]`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L66)

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

[core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L23)

___

### checkLoaded

▸ `Private` **checkLoaded**(): [`LoaderManager`](LoaderManager.md)

#### Returns

[`LoaderManager`](LoaderManager.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:128](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L128)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L218)

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

[core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): [`LoaderManager`](LoaderManager.md)

清空缓存

#### Returns

[`LoaderManager`](LoaderManager.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:427](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L427)

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

[core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L134)

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

[core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L195)

___

### exportConfig

▸ **exportConfig**(): `string`[]

导出配置单

**`Todo`**

对比缓存

#### Returns

`string`[]

#### Defined in

[plugins/loaderManager/LoaderManager.ts:419](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L419)

___

### getLoadDetailMap

▸ **getLoadDetailMap**(): `Object`

**`Deprecated`**

获取详细资源信息

#### Returns

`Object`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:391](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L391)

___

### getLoader

▸ **getLoader**(`ext`): ``null`` \| `Loader`

获取加载器

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ext` | `string` | 资源类型 |

#### Returns

``null`` \| `Loader`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L178)

___

### getResource

▸ **getResource**(`url`): `unknown`

获取url下的资源

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`unknown`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:382](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L382)

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

[core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L165)

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

[core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L48)

___

### hasLoaded

▸ **hasLoaded**(`url`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`boolean`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:373](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L373)

___

### load

▸ **load**(`urlList`): [`LoaderManager`](LoaderManager.md)

加载资源

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `urlList` | [`LoadUnit`](../modules.md#loadunit)[] | string[] \| [{ext: string, url: string}] |

#### Returns

[`LoaderManager`](LoaderManager.md)

this

#### Defined in

[plugins/loaderManager/LoaderManager.ts:191](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L191)

___

### loaded

▸ `Private` **loaded**(): [`LoaderManager`](LoaderManager.md)

#### Returns

[`LoaderManager`](LoaderManager.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:117](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L117)

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

[core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L178)

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

[core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L155)

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

[core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L120)

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

[core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L207)

___

### register

▸ **register**(`ext`, `loader`): [`LoaderManager`](LoaderManager.md)

注册loader

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ext` | `string` | 文件格式: jpg |
| `loader` | `Loader` | extend THREE.Loader |

#### Returns

[`LoaderManager`](LoaderManager.md)

this

#### Defined in

[plugins/loaderManager/LoaderManager.ts:367](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L367)

___

### remove

▸ **remove**(`url`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |

#### Returns

`void`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:407](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L407)

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

[core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L89)

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

[core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L66)

___

### reset

▸ **reset**(): [`LoaderManager`](LoaderManager.md)

重置加载管理器属性

#### Returns

[`LoaderManager`](LoaderManager.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:350](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L350)

___

### setLoadDetailMap

▸ **setLoadDetailMap**(`map`): [`LoaderManager`](LoaderManager.md)

**`Deprecated`**

设置详细资源信息

#### Parameters

| Name | Type |
| :------ | :------ |
| `map` | `Object` |

#### Returns

[`LoaderManager`](LoaderManager.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:401](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L401)

___

### setPath

▸ **setPath**(`path`): [`LoaderManager`](LoaderManager.md)

设置统一资源路径前缀

#### Parameters

| Name | Type |
| :------ | :------ |
| `path` | `string` |

#### Returns

[`LoaderManager`](LoaderManager.md)

#### Defined in

[plugins/loaderManager/LoaderManager.ts:143](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L143)

___

### setRequestHeader

▸ **setRequestHeader**(`headers`): [`LoaderManager`](LoaderManager.md)

设置请求头

#### Parameters

| Name | Type |
| :------ | :------ |
| `headers` | `Record`<`string`, `string`\> |

#### Returns

[`LoaderManager`](LoaderManager.md)

this

#### Defined in

[plugins/loaderManager/LoaderManager.ts:153](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L153)

___

### setResponseType

▸ **setResponseType**(`responseType`): [`LoaderManager`](LoaderManager.md)

设置响应类型

#### Parameters

| Name | Type |
| :------ | :------ |
| `responseType` | `string` |

#### Returns

[`LoaderManager`](LoaderManager.md)

this

#### Defined in

[plugins/loaderManager/LoaderManager.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L165)

___

### toJSON

▸ **toJSON**(): `string`

#### Returns

`string`

#### Defined in

[plugins/loaderManager/LoaderManager.ts:410](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/plugins/loaderManager/LoaderManager.ts#L410)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/a569a59e/packages/core/eventDispatcher/index.ts#L226)
