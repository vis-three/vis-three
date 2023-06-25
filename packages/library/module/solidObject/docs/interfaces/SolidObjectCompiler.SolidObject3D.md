# Interface: SolidObject3D

[SolidObjectCompiler](../modules/SolidObjectCompiler.md).SolidObject3D

## Hierarchy

- `Object3D`<`Event`\>

  ↳ **`SolidObject3D`**

## Properties

### animations

• **animations**: `AnimationClip`[]

Array with animation clips.

**`Default`**

```ts
[]
```

#### Inherited from

Object3D.animations

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:159

___

### castShadow

• **castShadow**: `boolean`

Gets rendered into shadow map.

**`Default`**

```ts
false
```

#### Inherited from

Object3D.castShadow

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:132

___

### children

• **children**: `Object3D`<`Event`\>[]

Array with object's children.

**`Default`**

```ts
[]
```

#### Inherited from

Object3D.children

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:51

___

### customDepthMaterial

• **customDepthMaterial**: `Material`

Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
When shadow-casting with a DirectionalLight or SpotLight, if you are (a) modifying vertex positions in
the vertex shader, (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a
transparent texture with alphaTest, you must specify a customDepthMaterial for proper shadows.

#### Inherited from

Object3D.customDepthMaterial

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:173

___

### customDistanceMaterial

• **customDistanceMaterial**: `Material`

Same as customDepthMaterial, but used with PointLight.

#### Inherited from

Object3D.customDistanceMaterial

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:178

___

### frustumCulled

• **frustumCulled**: `boolean`

When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object.
If set to false the object gets rendered every frame even if it is not in the frustum of the camera.

**`Default`**

```ts
true
```

#### Inherited from

Object3D.frustumCulled

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:145

___

### geometry

• **geometry**: `BufferGeometry`

#### Defined in

[packages/library/module/solidObject/SolidObjectCompiler.ts:7](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectCompiler.ts#L7)

___

### id

• **id**: `number`

Unique number of this object instance.

#### Inherited from

Object3D.id

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:26

___

### isObject3D

• `Readonly` **isObject3D**: ``true``

Used to check whether this or derived classes are Object3Ds. Default is true.
You should not change this, as it is used internally for optimisation.

#### Inherited from

Object3D.isObject3D

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:184

___

### layers

• **layers**: `Layers`

**`Default`**

```ts
new THREE.Layers()
```

#### Inherited from

Object3D.layers

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:121

___

### material

• **material**: `Material` \| `Material`[]

#### Defined in

[packages/library/module/solidObject/SolidObjectCompiler.ts:6](https://github.com/Shiotsukikaedesari/vis-three/blob/6da33b55/packages/library/module/solidObject/SolidObjectCompiler.ts#L6)

___

### matrix

• **matrix**: `Matrix4`

Local transform.

**`Default`**

```ts
new THREE.Matrix4()
```

#### Inherited from

Object3D.matrix

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:97

___

### matrixAutoUpdate

• **matrixAutoUpdate**: `boolean`

When this is set, it calculates the matrix of position, (rotation or quaternion) and scale every frame and also
recalculates the matrixWorld property.

**`Default`**

```ts
THREE.Object3D.DefaultMatrixAutoUpdate
```

#### Inherited from

Object3D.matrixAutoUpdate

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:110

___

### matrixWorld

• **matrixWorld**: `Matrix4`

The global transform of the object. If the Object3d has no parent, then it's identical to the local transform.

**`Default`**

```ts
new THREE.Matrix4()
```

#### Inherited from

Object3D.matrixWorld

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:103

___

### matrixWorldNeedsUpdate

• **matrixWorldNeedsUpdate**: `boolean`

When this is set, it calculates the matrixWorld in that frame and resets this property to false.

**`Default`**

```ts
false
```

#### Inherited from

Object3D.matrixWorldNeedsUpdate

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:116

___

### modelViewMatrix

• `Readonly` **modelViewMatrix**: `Matrix4`

**`Default`**

```ts
new THREE.Matrix4()
```

#### Inherited from

Object3D.modelViewMatrix

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:86

___

### name

• **name**: `string`

Optional name of the object (doesn't need to be unique).

**`Default`**

```ts
''
```

#### Inherited from

Object3D.name

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:34

___

### normalMatrix

• `Readonly` **normalMatrix**: `Matrix3`

**`Default`**

```ts
new THREE.Matrix3()
```

#### Inherited from

Object3D.normalMatrix

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:91

___

### onAfterRender

• **onAfterRender**: (`renderer`: `WebGLRenderer`, `scene`: `Scene`, `camera`: `Camera`, `geometry`: `BufferGeometry`, `material`: `Material`, `group`: `Group`) => `void`

#### Type declaration

▸ (`renderer`, `scene`, `camera`, `geometry`, `material`, `group`): `void`

Calls after rendering object

##### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `WebGLRenderer` |
| `scene` | `Scene` |
| `camera` | `Camera` |
| `geometry` | `BufferGeometry` |
| `material` | `Material` |
| `group` | `Group` |

##### Returns

`void`

#### Inherited from

Object3D.onAfterRender

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:201

___

### onBeforeRender

• **onBeforeRender**: (`renderer`: `WebGLRenderer`, `scene`: `Scene`, `camera`: `Camera`, `geometry`: `BufferGeometry`, `material`: `Material`, `group`: `Group`) => `void`

#### Type declaration

▸ (`renderer`, `scene`, `camera`, `geometry`, `material`, `group`): `void`

Calls before rendering object

##### Parameters

| Name | Type |
| :------ | :------ |
| `renderer` | `WebGLRenderer` |
| `scene` | `Scene` |
| `camera` | `Camera` |
| `geometry` | `BufferGeometry` |
| `material` | `Material` |
| `group` | `Group` |

##### Returns

`void`

#### Inherited from

Object3D.onBeforeRender

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:189

___

### parent

• **parent**: ``null`` \| `Object3D`<`Event`\>

Object's parent in the scene graph.

**`Default`**

```ts
null
```

#### Inherited from

Object3D.parent

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:45

___

### position

• `Readonly` **position**: `Vector3`

Object's local position.

**`Default`**

```ts
new THREE.Vector3()
```

#### Inherited from

Object3D.position

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:63

___

### quaternion

• `Readonly` **quaternion**: `Quaternion`

Object's local rotation as a Quaternion.

**`Default`**

```ts
new THREE.Quaternion()
```

#### Inherited from

Object3D.quaternion

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:75

___

### receiveShadow

• **receiveShadow**: `boolean`

Material gets baked in shadow receiving.

**`Default`**

```ts
false
```

#### Inherited from

Object3D.receiveShadow

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:138

___

### renderOrder

• **renderOrder**: `number`

Overrides the default rendering order of scene graph objects, from lowest to highest renderOrder.
Opaque and transparent objects remain sorted independently though.
When this property is set for an instance of Group, all descendants objects will be sorted and rendered together.

**`Default`**

```ts
0
```

#### Inherited from

Object3D.renderOrder

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:153

___

### rotation

• `Readonly` **rotation**: `Euler`

Object's local rotation (Euler angles), in radians.

**`Default`**

```ts
new THREE.Euler()
```

#### Inherited from

Object3D.rotation

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:69

___

### scale

• `Readonly` **scale**: `Vector3`

Object's local scale.

**`Default`**

```ts
new THREE.Vector3()
```

#### Inherited from

Object3D.scale

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:81

___

### type

• **type**: `string`

**`Default`**

```ts
'Object3D'
```

#### Inherited from

Object3D.type

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:39

___

### up

• **up**: `Vector3`

Up direction.

**`Default`**

```ts
THREE.Object3D.DefaultUp.clone()
```

#### Inherited from

Object3D.up

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:57

___

### userData

• **userData**: `Object`

An object that can be used to store custom data about the Object3d. It should not hold references to functions as these will not be cloned.

**`Default`**

```ts
{}
```

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

Object3D.userData

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:165

___

### uuid

• **uuid**: `string`

#### Inherited from

Object3D.uuid

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:28

___

### visible

• **visible**: `boolean`

Object gets rendered if true.

**`Default`**

```ts
true
```

#### Inherited from

Object3D.visible

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:126

## Methods

### add

▸ **add**(`...object`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Adds object as child of this object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...object` | `Object3D`<`Event`\>[] |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.add

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:305

___

### addEventListener

▸ **addEventListener**<`T`\>(`type`, `listener`): `void`

Adds a listener to an event type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of event to listen to. |
| `listener` | `EventListener`<`Event`, `T`, [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)\> | The function that gets called when the event is fired. |

#### Returns

`void`

#### Inherited from

Object3D.addEventListener

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/EventDispatcher.d.ts:30

___

### applyMatrix4

▸ **applyMatrix4**(`matrix`): `void`

This updates the position, rotation and scale with the matrix.

#### Parameters

| Name | Type |
| :------ | :------ |
| `matrix` | `Matrix4` |

#### Returns

`void`

#### Inherited from

Object3D.applyMatrix4

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:216

___

### applyQuaternion

▸ **applyQuaternion**(`quaternion`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `quaternion` | `Quaternion` |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.applyQuaternion

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:218

___

### attach

▸ **attach**(`object`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Adds object as a child of this, while maintaining the object's world transform.

#### Parameters

| Name | Type |
| :------ | :------ |
| `object` | `Object3D`<`Event`\> |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.attach

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:325

___

### clear

▸ **clear**(): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Removes all child objects.

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.clear

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:320

___

### clone

▸ **clone**(`recursive?`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `recursive?` | `boolean` |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.clone

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:368

___

### copy

▸ **copy**(`source`, `recursive?`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md) |
| `recursive?` | `boolean` |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.copy

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:375

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Fire an event type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `Event` |

#### Returns

`void`

#### Inherited from

Object3D.dispatchEvent

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/EventDispatcher.d.ts:50

___

### getObjectById

▸ **getObjectById**(`id`): `undefined` \| `Object3D`<`Event`\>

Searches through the object's children and returns the first with a matching id.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `number` | Unique number of the object instance |

#### Returns

`undefined` \| `Object3D`<`Event`\>

#### Inherited from

Object3D.getObjectById

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:331

___

### getObjectByName

▸ **getObjectByName**(`name`): `undefined` \| `Object3D`<`Event`\>

Searches through the object's children and returns the first with a matching name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | String to match to the children's Object3d.name property. |

#### Returns

`undefined` \| `Object3D`<`Event`\>

#### Inherited from

Object3D.getObjectByName

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:337

___

### getObjectByProperty

▸ **getObjectByProperty**(`name`, `value`): `undefined` \| `Object3D`<`Event`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `value` | `string` |

#### Returns

`undefined` \| `Object3D`<`Event`\>

#### Inherited from

Object3D.getObjectByProperty

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:339

___

### getWorldDirection

▸ **getWorldDirection**(`target`): `Vector3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Vector3` |

#### Returns

`Vector3`

#### Inherited from

Object3D.getWorldDirection

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:344

___

### getWorldPosition

▸ **getWorldPosition**(`target`): `Vector3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Vector3` |

#### Returns

`Vector3`

#### Inherited from

Object3D.getWorldPosition

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:341

___

### getWorldQuaternion

▸ **getWorldQuaternion**(`target`): `Quaternion`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Quaternion` |

#### Returns

`Quaternion`

#### Inherited from

Object3D.getWorldQuaternion

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:342

___

### getWorldScale

▸ **getWorldScale**(`target`): `Vector3`

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Vector3` |

#### Returns

`Vector3`

#### Inherited from

Object3D.getWorldScale

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:343

___

### hasEventListener

▸ **hasEventListener**<`T`\>(`type`, `listener`): `boolean`

Checks if listener is added to an event type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of event to listen to. |
| `listener` | `EventListener`<`Event`, `T`, [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)\> | The function that gets called when the event is fired. |

#### Returns

`boolean`

#### Inherited from

Object3D.hasEventListener

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/EventDispatcher.d.ts:37

___

### localToWorld

▸ **localToWorld**(`vector`): `Vector3`

Updates the vector from local space to world space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` | A local vector. |

#### Returns

`Vector3`

#### Inherited from

Object3D.localToWorld

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:288

___

### lookAt

▸ **lookAt**(`vector`, `y?`, `z?`): `void`

Rotates object to face point in space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `number` \| `Vector3` | A world vector to look at. |
| `y?` | `number` | - |
| `z?` | `number` | - |

#### Returns

`void`

#### Inherited from

Object3D.lookAt

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:300

___

### raycast

▸ **raycast**(`raycaster`, `intersects`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `raycaster` | `Raycaster` |
| `intersects` | `Intersection`<`Object3D`<`Event`\>\>[] |

#### Returns

`void`

#### Inherited from

Object3D.raycast

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:346

___

### remove

▸ **remove**(`...object`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Removes object as child of this object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...object` | `Object3D`<`Event`\>[] |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.remove

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:310

___

### removeEventListener

▸ **removeEventListener**<`T`\>(`type`, `listener`): `void`

Removes a listener from an event type.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | The type of the listener that gets removed. |
| `listener` | `EventListener`<`Event`, `T`, [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)\> | The listener function that gets removed. |

#### Returns

`void`

#### Inherited from

Object3D.removeEventListener

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/EventDispatcher.d.ts:44

___

### removeFromParent

▸ **removeFromParent**(): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Removes this object from its current parent.

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.removeFromParent

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:315

___

### rotateOnAxis

▸ **rotateOnAxis**(`axis`, `angle`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Rotate an object along an axis in object space. The axis is assumed to be normalized.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | `Vector3` | A normalized vector in object space. |
| `angle` | `number` | The angle in radians. |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.rotateOnAxis

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:233

___

### rotateOnWorldAxis

▸ **rotateOnWorldAxis**(`axis`, `angle`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Rotate an object along an axis in world space. The axis is assumed to be normalized. Method Assumes no rotated parent.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | `Vector3` | A normalized vector in object space. |
| `angle` | `number` | The angle in radians. |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.rotateOnWorldAxis

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:240

___

### rotateX

▸ **rotateX**(`angle`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.rotateX

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:246

___

### rotateY

▸ **rotateY**(`angle`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.rotateY

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:252

___

### rotateZ

▸ **rotateZ**(`angle`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `angle` | `number` |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.rotateZ

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:258

___

### setRotationFromAxisAngle

▸ **setRotationFromAxisAngle**(`axis`, `angle`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `axis` | `Vector3` |
| `angle` | `number` |

#### Returns

`void`

#### Inherited from

Object3D.setRotationFromAxisAngle

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:220

___

### setRotationFromEuler

▸ **setRotationFromEuler**(`euler`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `euler` | `Euler` |

#### Returns

`void`

#### Inherited from

Object3D.setRotationFromEuler

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:222

___

### setRotationFromMatrix

▸ **setRotationFromMatrix**(`m`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `Matrix4` |

#### Returns

`void`

#### Inherited from

Object3D.setRotationFromMatrix

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:224

___

### setRotationFromQuaternion

▸ **setRotationFromQuaternion**(`q`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `q` | `Quaternion` |

#### Returns

`void`

#### Inherited from

Object3D.setRotationFromQuaternion

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:226

___

### toJSON

▸ **toJSON**(`meta?`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `meta?` | `Object` |
| `meta.geometries` | `any` |
| `meta.images` | `any` |
| `meta.materials` | `any` |
| `meta.textures` | `any` |

#### Returns

`any`

#### Inherited from

Object3D.toJSON

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:366

___

### translateOnAxis

▸ **translateOnAxis**(`axis`, `distance`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `axis` | `Vector3` | A normalized vector in object space. |
| `distance` | `number` | The distance to translate. |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.translateOnAxis

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:264

___

### translateX

▸ **translateX**(`distance`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Translates object along x axis by distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `number` | Distance. |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.translateX

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:270

___

### translateY

▸ **translateY**(`distance`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Translates object along y axis by distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `number` | Distance. |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.translateY

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:276

___

### translateZ

▸ **translateZ**(`distance`): [`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

Translates object along z axis by distance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `distance` | `number` | Distance. |

#### Returns

[`SolidObject3D`](SolidObjectCompiler.SolidObject3D.md)

#### Inherited from

Object3D.translateZ

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:282

___

### traverse

▸ **traverse**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`object`: `Object3D`<`Event`\>) => `any` |

#### Returns

`void`

#### Inherited from

Object3D.traverse

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:348

___

### traverseAncestors

▸ **traverseAncestors**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`object`: `Object3D`<`Event`\>) => `any` |

#### Returns

`void`

#### Inherited from

Object3D.traverseAncestors

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:352

___

### traverseVisible

▸ **traverseVisible**(`callback`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`object`: `Object3D`<`Event`\>) => `any` |

#### Returns

`void`

#### Inherited from

Object3D.traverseVisible

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:350

___

### updateMatrix

▸ **updateMatrix**(): `void`

Updates local transform.

#### Returns

`void`

#### Inherited from

Object3D.updateMatrix

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:357

___

### updateMatrixWorld

▸ **updateMatrixWorld**(`force?`): `void`

Updates global transform of the object and its children.

#### Parameters

| Name | Type |
| :------ | :------ |
| `force?` | `boolean` |

#### Returns

`void`

#### Inherited from

Object3D.updateMatrixWorld

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:362

___

### updateWorldMatrix

▸ **updateWorldMatrix**(`updateParents`, `updateChildren`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `updateParents` | `boolean` |
| `updateChildren` | `boolean` |

#### Returns

`void`

#### Inherited from

Object3D.updateWorldMatrix

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:364

___

### worldToLocal

▸ **worldToLocal**(`vector`): `Vector3`

Updates the vector from world space to local space.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `vector` | `Vector3` | A world vector. |

#### Returns

`Vector3`

#### Inherited from

Object3D.worldToLocal

#### Defined in

node_modules/.pnpm/@types+three@0.133.1/node_modules/@types/three/src/core/Object3D.d.ts:294
