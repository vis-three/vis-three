# Interface: EventManagerParameters

## Properties

### camera

• **camera**: `Camera`

指定事件触发相机

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:28](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L28)

___

### penetrate

• `Optional` **penetrate**: `boolean`

是否穿透触发事件，比如2个物体即使重叠都会触发

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:32](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L32)

___

### raycaster

• `Optional` **raycaster**: `Object`

射线设置 参考three.js的射线设置

#### Type declaration

| Name | Type |
| :------ | :------ |
| `params` | { `Line?`: { `threshold`: `number`  } ; `Points?`: { `threshold`: `number`  }  } |
| `params.Line?` | { `threshold`: `number`  } |
| `params.Line.threshold` | `number` |
| `params.Points?` | { `threshold`: `number`  } |
| `params.Points.threshold` | `number` |

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:35](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L35)

___

### recursive

• `Optional` **recursive**: `boolean`

是否递归场景物体子集

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:30](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L30)

___

### scene

• **scene**: `Scene`

指定事件触发场景

#### Defined in

[packages/plugins/EventManagerPlugin/EventManager.ts:26](https://github.com/Shiotsukikaedesari/vis-three/blob/d84d84d0/packages/plugins/EventManagerPlugin/EventManager.ts#L26)
