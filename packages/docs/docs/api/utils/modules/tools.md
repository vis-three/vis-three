# Module: tools

## Type Aliases

### IgnoreAttribute

Ƭ **IgnoreAttribute**<`O`\>: `DeepUnion`<`DeepPartial`<`DeepRecord`<`O`, `boolean`\>\>, `boolean`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `O` | extends `object` |

#### Defined in

[tools/index.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L17)

## Functions

### extendPath

▸ **extendPath**(`str1`, `str2`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str1` | `string` |
| `str2` | `string` |

#### Returns

`string`

#### Defined in

[tools/index.ts:105](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L105)

___

### isArray

▸ **isArray**(`object`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

`boolean`

#### Defined in

[tools/index.ts:74](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L74)

___

### isObject

▸ **isObject**(`object`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

`boolean`

#### Defined in

[tools/index.ts:70](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L70)

___

### isValidEnum

▸ **isValidEnum**(`enumeration`, `value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `enumeration` | `object` |
| `value` | `string` \| `number` |

#### Returns

`boolean`

#### Defined in

[tools/index.ts:10](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L10)

___

### isValidKey

▸ **isValidKey**(`key`, `object`): key is never

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` \| `number` \| `symbol` |
| `object` | `object` |

#### Returns

key is never

#### Defined in

[tools/index.ts:3](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L3)

___

### syncObject

▸ **syncObject**<`C`, `T`\>(`config`, `target`, `filter?`, `callBack?`): `void`

同步对象

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends `object` |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | `C` | 配置对象 |
| `target` | `T` | 目标对象 |
| `filter?` | `DeepUnion`<`DeepPartial`<`DeepRecord`<`C`, `boolean`\>\>, `boolean`\> | 过滤属性 |
| `callBack?` | `Function` | 回调 |

#### Returns

`void`

#### Defined in

[tools/index.ts:29](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L29)

___

### transPkgName

▸ **transPkgName**(`str`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`string`

#### Defined in

[tools/index.ts:109](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L109)

___

### typeOf

▸ **typeOf**(`object`): ``"string"`` \| ``"number"`` \| ``"bigint"`` \| ``"boolean"`` \| ``"symbol"`` \| ``"undefined"`` \| ``"object"`` \| ``"function"`` \| ``"null"`` \| ``"array"`` \| ``"String"`` \| ``"Number"`` \| ``"Boolean"``

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `any` |

#### Returns

``"string"`` \| ``"number"`` \| ``"bigint"`` \| ``"boolean"`` \| ``"symbol"`` \| ``"undefined"`` \| ``"object"`` \| ``"function"`` \| ``"null"`` \| ``"array"`` \| ``"String"`` \| ``"Number"`` \| ``"Boolean"``

#### Defined in

[tools/index.ts:78](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/utils/tools/index.ts#L78)
