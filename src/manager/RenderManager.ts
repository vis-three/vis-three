import { Clock } from "three";
import { BaseEvent, EventDispatcher } from "../core/EventDispatcher";

// 渲染事件
export interface RenderEvent extends BaseEvent {
  delta: number;
  total: number;
}

export class RenderManager extends EventDispatcher {
  private clock: Clock = new Clock(); // 引擎时钟
  private animationFrame = -1; // 渲染定时器
  private fps = 0; // 帧率 0 跟随系统

  /**
   * 渲染一帧
   */
  render = (): void => {
    const clock: Clock = this.clock;
    const delta: number = clock.getDelta();
    const total: number = clock.getElapsedTime();

    this.dispatchEvent({
      type: "render",
      delta,
      total,
    });
  };

  /**
   * 根据指定fps进行持续渲染
   */
  play = (): void => {
    if (this.hasRendering()) {
      console.warn(`render manager is rendering.`);
      return;
    }

    this.dispatchEvent({
      type: "play",
    });

    const playFun = () => {
      this.render();
      this.animationFrame = requestAnimationFrame(playFun);
    };
    playFun();
  };

  /**
   * 停止渲染
   */
  stop = (): void => {
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = -1;
    this.dispatchEvent({
      type: "stop",
    });
  };

  /**
   * 是否处于渲染当中
   * @returns boolean
   */
  hasRendering = (): boolean => {
    return this.animationFrame !== -1;
  };

  /**
   * 是否有效渲染队列
   * @returns boolean
   */
  hasVaildRender = (): boolean => {
    return this.useful();
  };

  /**
   * 销毁内存
   */
  dispose() {
    if (this.hasRendering()) {
      this.stop();
    }
    this.clear();
  }
}
