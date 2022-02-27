import { Tween } from "@tweenjs/tween.js";
import { ObjectEvent } from "../../manager/EventManager";
import { RenderEvent } from "../../manager/RenderManager";
import { EventCompiler, EventHandler } from "../../middleware/event/EventCompiler";
import { MoveSpacing, MoveTo } from "./configure";

export const moveTo: EventHandler<MoveTo> = function (compiler: EventCompiler, config: MoveTo): (event?: ObjectEvent) => void {
  const params = config.params
  let object = compiler.getObject(params.target)

  if (!object) {
    console.error(`can not found vid object: ${params.target}`)
    return () => {}
  }

  let renderManager = compiler.engine.renderManager!

  return () => {
    const tween = new Tween(object!.position)
    .to(params.position)
    .duration(params.duration)
    .delay(params.delay)
    .easing(params.timingFunction)
    .start()

    const renderFun = (event: RenderEvent) => {
      tween.update()
    }

    renderManager.addEventListener<RenderEvent>('render', renderFun)

    tween.onComplete(() => {
      renderManager.removeEventListener<RenderEvent>('render', renderFun)
    })
  }
}

export const moveSpacing: EventHandler<MoveSpacing> = function (compiler: EventCompiler, config: MoveSpacing): (event?: ObjectEvent) => void {
  const params = config.params
  let object = compiler.getObject(params.target)

  if (!object) {
    console.error(`can not found vid object: ${params.target}`)
    return () => {}
  }

  let renderManager = compiler.engine.renderManager!

  return () => {
    const tween = new Tween(object!.position)
    .to({
      x: object!.position.x + params.spacing.x,
      y: object!.position.y + params.spacing.y,
      z: object!.position.z + params.spacing.z,
    })
    .duration(params.duration)
    .delay(params.delay)
    .easing(params.timingFunction)
    .start()

    const renderFun = (event: RenderEvent) => {
      tween.update()
    }

    renderManager.addEventListener<RenderEvent>('render', renderFun)

    tween.onComplete(() => {
      renderManager.removeEventListener<RenderEvent>('render', renderFun)
    })
  }
} 