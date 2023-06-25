# Module: SolidObjectProcessor

## Type Aliases

### SolidObjectCommands

Ƭ **SolidObjectCommands**<`C`, `T`\>: `ObjectCommands`<`C`, `T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `SolidObjectConfig` |
| `T` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md) |

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:135](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L135)

## Variables

### replaceGeometry

• `Const` **replaceGeometry**: `BoxGeometry`

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:33](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L33)

___

### replaceMaterial

• `Const` **replaceMaterial**: `ShaderMaterial`

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:25](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L25)

___

### solidObjectCommands

• `Const` **solidObjectCommands**: [`SolidObjectCommands`](SolidObjectProcessor.md#solidobjectcommands)<`SolidObjectConfig`, [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)\>

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:140](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L140)

## Functions

### geometryHandler

▸ **geometryHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `SolidObjectConfig` |
| `O` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L35)

___

### materialHandler

▸ **materialHandler**<`C`, `O`\>(`«destructured»`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `SolidObjectConfig` |
| `O` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `«destructured»` | `ProcessParams`<`C`, `O`, `EngineSupport`, `any`\> |

#### Returns

`void`

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:58](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L58)

___

### solidObjectCreate

▸ **solidObjectCreate**<`C`, `O`\>(`object`, `config`, `filter`, `engine`): `O`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `SolidObjectConfig` |
| `O` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

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

[packages/library/module/solidObject/SolidObjectProcessor.ts:95](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L95)

___

### solidObjectDispose

▸ **solidObjectDispose**<`O`\>(`target`): `void`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends [`SolidObject3D`](../interfaces/SolidObjectCompiler.SolidObject3D.md)<`O`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `O` |

#### Returns

`void`

#### Defined in

[packages/library/module/solidObject/SolidObjectProcessor.ts:129](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectProcessor.ts#L129)
