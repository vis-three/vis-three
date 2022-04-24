import { Clock } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
export class RenderManager extends EventDispatcher {
    clock = new Clock(); // 引擎时钟
    animationFrame = -1; // 渲染定时器
    fps = 0; // 帧率 0 跟随系统
    /**
     * 渲染一帧
     */
    render = () => {
        const clock = this.clock;
        const delta = clock.getDelta();
        const total = clock.getElapsedTime();
        this.dispatchEvent({
            type: "render",
            delta,
            total,
        });
    };
    /**
     * 根据指定fps进行持续渲染
     */
    play = () => {
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
    stop = () => {
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
    hasRendering = () => {
        return this.animationFrame !== -1;
    };
    /**
     * 是否有效渲染队列
     * @returns boolean
     */
    hasVaildRender = () => {
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
//# sourceMappingURL=RenderManager.js.map