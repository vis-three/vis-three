# Module: ObjectProcessor

## Interfaces

- [ObjectCacheData](../interfaces/ObjectProcessor.ObjectCacheData.md)

## Type Aliases

### ObjectCommands

Ƭ **ObjectCommands**<`C`, `T`\>: `ProcessorCommands`<`C`, `T`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `T`\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `T` | extends `Object3D` |

#### Defined in

[library/module/object/ObjectProcessor.ts:341](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L341)

## Variables

### objectCommands

• `Const` **objectCommands**: [`ObjectCommands`](ObjectProcessor.md#objectcommands)<`ObjectConfig`, `Object3D`\>

#### Defined in

[library/module/object/ObjectProcessor.ts:346](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L346)

## Functions

### addChildrenHanlder

▸ **addChildrenHanlder**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:184](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L184)

___

### addEventHanlder

▸ **addEventHanlder**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:94](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L94)

___

### lookAtHandler

▸ **lookAtHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L29)

___

### objectCreate

▸ **objectCreate**<`C`, `O`\>(`object`, `config`, `filter`, `engine`): `O`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `O` |
| `config` | `C` |
| `filter` | `DeepUnion`<`DeepPartial`<`DeepRecord`<`C`, `boolean`\>\>, `boolean`\> |
| `engine` | `EngineSupport` |

#### Returns

`O`

#### Defined in

[library/module/object/ObjectProcessor.ts:278](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L278)

___

### objectDispose

▸ **objectDispose**<`O`\>(`target`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `O` |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:336](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L336)

___

### removeChildrenHandler

▸ **removeChildrenHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:245](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L245)

___

### removeEventHandler

▸ **removeEventHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:124](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L124)

___

### updateEventHandler

▸ **updateEventHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `ObjectConfig` |
| `O` | extends `Object3D`<`Event`, `O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, [`ObjectCompiler`](../classes/ObjectCompiler.ObjectCompiler.md)<`C`, `O`\>\> |

#### Returns

`void`

#### Defined in

[library/module/object/ObjectProcessor.ts:145](https://github.com/Shiotsukikaedesari/vis-three/blob/915cd5ad/packages/library/module/object/ObjectProcessor.ts#L145)
