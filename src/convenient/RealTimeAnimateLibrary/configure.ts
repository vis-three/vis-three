import { Vector3Config } from "../../middleware/common/CommonConfig"
import { BasicEventConfig } from "../../middleware/event/EventCompiler"
import { generateConfigFunction } from "../../utils/utils"
import { Easing, EasingFunction} from '@tweenjs/tween.js'

export interface MoveTo extends BasicEventConfig{
  params: {
    target: string,
    position: Vector3Config,
    delay: number,
    duration: number,
    timingFunction: EasingFunction,
  }
}

export interface MoveSpacing extends BasicEventConfig {
  params: {
    target: string,
    spacing: Vector3Config,
    delay: number,
    duration: number,
    timingFunction: EasingFunction,
  }
}

export const moveTo = generateConfigFunction<MoveTo>({
  name: 'moveTo',
  desp: '物体移动到',
  params: {
    target: '',
    position: {
      x: 0,
      y: 0,
      z: 0
    },
    delay: 0,
    duration: 1000,
    timingFunction: Easing.Quadratic.InOut,
  }
})

export const moveSpacing = generateConfigFunction<MoveSpacing>({
  name: 'moveSpacing',
  desp: '物体移动间距',
  params: {
    target: '',
    spacing: {
      x: 10,
      y: 10,
      z: 10
    },
    delay: 0,
    duration: 1000,
    timingFunction: Easing.Quadratic.InOut,
  }
})