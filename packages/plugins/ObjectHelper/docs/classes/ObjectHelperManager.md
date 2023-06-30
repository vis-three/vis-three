# Class: ObjectHelperManager

## Hierarchy

- `EventDispatcher`

  ↳ **`ObjectHelperManager`**

## Constructors

### constructor

• **new ObjectHelperManager**(`params?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`ObjectHelperManagerParameters`](../interfaces/ObjectHelperManagerParameters.md) |

#### Overrides

EventDispatcher.constructor

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:55](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L55)

## Properties

### helperFilter

• `Private` **helperFilter**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AmbientLight` | `boolean` |
| `HemisphereLight` | `boolean` |
| `Object3D` | `boolean` |
| `Scene` | `boolean` |
| `TransformControls` | `boolean` |

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:43](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L43)

___

### helperGenerator

• `Private` **helperGenerator**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `CSS2DPlane` | typeof `CSS2DPlaneHelper` |
| `CSS3DPlane` | typeof `CSS3DPlaneHelper` |
| `CSS3DSprite` | typeof `CSS3DSpriteHelper` |
| `DirectionalLight` | typeof `DirectionalLightHelper` |
| `Group` | typeof `GroupHelper` |
| `Line` | typeof `LineHelper` |
| `Mesh` | typeof `MeshHelper` |
| `OrthographicCamera` | typeof `CameraHelper` |
| `PerspectiveCamera` | typeof `CameraHelper` |
| `PointLight` | typeof `PointLightHelper` |
| `Points` | typeof `PointsHelper` |
| `RectAreaLight` | typeof `RectAreaLightHelper` |
| `SpotLight` | typeof `SpotLightHelper` |
| `Sprite` | typeof `SpriteHelper` |

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L26)

___

### objectFilter

• `Private` **objectFilter**: `Set`<`Object3D`<`Event`\>\>

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:51](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L51)

___

### objectHelperMap

• **objectHelperMap**: `Map`<`Object3D`<`Event`\>, `Object3D`<`Event`\>\>

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:53](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L53)

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

[core/eventDispatcher/index.ts:23](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L23)

___

### addFilteredObject

▸ **addFilteredObject**(`...objects`): [`ObjectHelperManager`](ObjectHelperManager.md)

@description: 添加过滤的物体

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...objects` | `Object3D`<`Event`\>[] | three object |

#### Returns

[`ObjectHelperManager`](ObjectHelperManager.md)

this

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:81](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L81)

___

### addObjectHelper

▸ **addObjectHelper**(`object`): ``null`` \| `Object3D`<`Event`\>

@description:添加物体辅助

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object3D`<`Event`\> |

#### Returns

``null`` \| `Object3D`<`Event`\>

three object or null

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:94](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L94)

___

### clear

▸ **clear**(): `void`

清空所有事件

#### Returns

`void`

#### Inherited from

EventDispatcher.clear

#### Defined in

[core/eventDispatcher/index.ts:218](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L218)

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

[core/eventDispatcher/index.ts:101](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L101)

___

### dispose

▸ **dispose**(): `void`

释放所有管理器资源

#### Returns

`void`

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:161](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L161)

___

### disposeObjectHelper

▸ **disposeObjectHelper**(`object`): ``null`` \| `Object3D`<`Event`\>

@description: 销毁物体辅助

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `object` | `Object3D`<`Event`\> | three object |

#### Returns

``null`` \| `Object3D`<`Event`\>

three object or null

#### Defined in

[plugins/ObjectHelper/ObjectHelperManager.ts:122](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/plugins/ObjectHelper/ObjectHelperManager.ts#L122)

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

[core/eventDispatcher/index.ts:134](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L134)

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

[core/eventDispatcher/index.ts:195](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L195)

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

[core/eventDispatcher/index.ts:165](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L165)

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

[core/eventDispatcher/index.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L48)

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

[core/eventDispatcher/index.ts:178](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L178)

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

[core/eventDispatcher/index.ts:155](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L155)

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

[core/eventDispatcher/index.ts:120](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L120)

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

[core/eventDispatcher/index.ts:207](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L207)

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

[core/eventDispatcher/index.ts:89](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L89)

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

[core/eventDispatcher/index.ts:66](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L66)

___

### useful

▸ **useful**(): `boolean`

当前派发器是否使用

#### Returns

`boolean`

#### Inherited from

EventDispatcher.useful

#### Defined in

[core/eventDispatcher/index.ts:226](https://github.com/Shiotsukikaedesari/vis-three/blob/69da51d8/packages/core/eventDispatcher/index.ts#L226)
