# Interface: PluginOptions<E\>

[plugin](../modules/plugin.md).PluginOptions

## Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends [`Engine`](../classes/engine.Engine.md) |

## Table of contents

### Properties

- [deps](plugin.PluginOptions.md#deps)
- [dispose](plugin.PluginOptions.md#dispose)
- [install](plugin.PluginOptions.md#install)
- [name](plugin.PluginOptions.md#name)

## Properties

### deps

• `Optional` **deps**: `string` \| `string`[]

#### Defined in

[plugin/index.ts:5](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/plugin/index.ts#L5)

___

### dispose

• **dispose**: (`engine`: `E`) => `void`

#### Type declaration

▸ (`engine`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `E` |

##### Returns

`void`

#### Defined in

[plugin/index.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/plugin/index.ts#L7)

___

### install

• **install**: (`engine`: `E`) => `void`

#### Type declaration

▸ (`engine`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `engine` | `E` |

##### Returns

`void`

#### Defined in

[plugin/index.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/plugin/index.ts#L6)

___

### name

• **name**: `string`

#### Defined in

[plugin/index.ts:4](https://github.com/Shiotsukikaedesari/vis-three/blob/f03bb58b/packages/core/plugin/index.ts#L4)
