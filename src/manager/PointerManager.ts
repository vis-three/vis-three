import { BaseEvent, Vector2 } from "three";
import { EventDispatcher } from "../core/EventDispatcher";

export interface VisPointerEvent extends Omit<PointerEvent, 'type'>, BaseEvent {
  mouse: Vector2
}

export interface PointerManagerParameters {
  dom: HTMLCanvasElement
  throttleTime?: number
}

export class PointerManager extends EventDispatcher {

  private dom: HTMLCanvasElement
  private mouse: Vector2

  private canMouseMove: boolean
  private mouseEventTimer: number | null
  private throttleTime: number

  constructor (parameters: PointerManagerParameters) {
    super()
    const dom = parameters.dom

    this.dom = dom
    this.mouse = new Vector2()

    this.canMouseMove = true
    this.mouseEventTimer = null
    this.throttleTime = parameters.throttleTime || 1000 / 60

    dom.addEventListener('pointerdown', (event: PointerEvent) => {
      this.pointerDown(event)
    })

    dom.addEventListener('pointermove', (event: PointerEvent) => {
      if (!this.canMouseMove) {
        return
      }
      this.canMouseMove = false
      this.mouseEventTimer = setTimeout(() => {
        const mouse = this.mouse
        const dom = this.dom

        mouse.x = (event.offsetX / dom.offsetWidth) * 2 - 1
        mouse.y = -(event.offsetY / dom.offsetHeight) * 2 + 1

        this.canMouseMove = true

        this.pointerMove(event)
      }, this.throttleTime)
    })

    dom.addEventListener('pointerup', (event: PointerEvent) => {
      this.pointerUp(event)
    })
  }

  // 获取鼠标指针
  getMousePoint (): Vector2 {
    return this.mouse
  }

  // 鼠标指针按下
  pointerDown (event: PointerEvent) {
    const eventObject = {mouse: this.mouse}
    for (let key in event) {
      eventObject[key] = event[key]
    }
    this.dispatchEvent(eventObject as VisPointerEvent)
  }

  // 鼠标指针移动
  pointerMove (event: PointerEvent) {
    const eventObject = {mouse: this.mouse}
    for (let key in event) {
      eventObject[key] = event[key]
    }
    this.dispatchEvent(eventObject as VisPointerEvent)
  }

  // 鼠标指针抬起
  pointerUp (event: PointerEvent) {
    const eventObject = {mouse: this.mouse}
    for (let key in event) {
      eventObject[key] = event[key]
    }
    this.dispatchEvent(eventObject as VisPointerEvent)
  }
}