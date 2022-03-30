import { 
  Clock,
  } from "three";
import { BaseEvent, EventDispatcher } from "../core/EventDispatcher";
import { RENDERERMANAGER } from "../middleware/constants/EVENTTYPE";

// 渲染事件
export interface RenderEvent extends BaseEvent {
  delta: number
  total: number
}

export class RenderManager extends EventDispatcher {

  private clock: Clock = new Clock() // 引擎时钟
  private animationFrame = -1 // 渲染定时器
  private fps: number = 0 // 帧率 0 跟随系统

  // 渲染
  render = (): void => {
    const clock: Clock = this.clock
    const delta: number = clock.getDelta()
    const total: number = clock.getElapsedTime()

    this.dispatchEvent({
      type: RENDERERMANAGER.RENDER,
      delta,
      total
    })
  }

  // 播放
  play = (): void => {
    if (this.hasRendering()) {
      console.warn(`render manager has rendering.`)
      return 
    }

    this.dispatchEvent({
      type: RENDERERMANAGER.PLAY
    })

    const playFun = () => {
      this.render()
      this.animationFrame =  requestAnimationFrame(playFun)
    }
    playFun()
  }

  // 停止渲染
  stop = (): void => {
    cancelAnimationFrame(this.animationFrame)
    this.animationFrame = -1
    this.dispatchEvent({
      type: RENDERERMANAGER.STOP
    })
  }

  // 是否处于渲染当中
  hasRendering = (): boolean => {
    return this.animationFrame !== -1
  }

  // 是否有效渲染队列
  hasVaildRender = (): boolean => {
    return this.useful()
  }
}