# Class: ShaderGeneratorManager

[manager](../modules/manager.md).ShaderGeneratorManager

## Constructors

### constructor

• **new ShaderGeneratorManager**()

## Properties

### library

▪ `Static` `Private` **library**: `Map`<`string`, [`Shader`](../interfaces/manager.Shader.md)\>

#### Defined in

[packages/middleware/manager/ShaderGeneratorManager.ts:11](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/ShaderGeneratorManager.ts#L11)

___

### register

▪ `Static` **register**: (`shader`: [`Shader`](../interfaces/manager.Shader.md)) => `void`

#### Type declaration

▸ (`shader`): `void`

注册着色器文件

##### Parameters

| Name | Type |
| :------ | :------ |
| `shader` | [`Shader`](../interfaces/manager.Shader.md) |

##### Returns

`void`

#### Defined in

[packages/middleware/manager/ShaderGeneratorManager.ts:17](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/ShaderGeneratorManager.ts#L17)

## Methods

### cloneShader

▸ `Static` **cloneShader**(`shader`): [`Shader`](../interfaces/manager.Shader.md)

克隆着色器

#### Parameters

| Name | Type |
| :------ | :------ |
| `shader` | [`Shader`](../interfaces/manager.Shader.md) |

#### Returns

[`Shader`](../interfaces/manager.Shader.md)

#### Defined in

[packages/middleware/manager/ShaderGeneratorManager.ts:72](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/ShaderGeneratorManager.ts#L72)

___

### generateConfig

▸ `Static` **generateConfig**(`name`): `Object`

获取该着色器文件对应的配置

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Object`

#### Defined in

[packages/middleware/manager/ShaderGeneratorManager.ts:48](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/ShaderGeneratorManager.ts#L48)

___

### getShader

▸ `Static` **getShader**(`name`): ``null`` \| [`Shader`](../interfaces/manager.Shader.md)

获取着色器文件

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | 文件名 |

#### Returns

``null`` \| [`Shader`](../interfaces/manager.Shader.md)

shader | null

#### Defined in

[packages/middleware/manager/ShaderGeneratorManager.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/2f5203e6/packages/middleware/manager/ShaderGeneratorManager.ts#L32)
