import { Clock, } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { RENDERERMANAGER } from "../middleware/constants/EVENTTYPE";
export class RenderManager extends EventDispatcher {
    clock = new Clock(); // 引擎时钟
    animationFrame = -1; // 渲染定时器
    fps = 0; // 帧率 0 跟随系统
    // 渲染
    render = () => {
        const clock = this.clock;
        const delta = clock.getDelta();
        const total = clock.getElapsedTime();
        this.dispatchEvent({
            type: RENDERERMANAGER.RENDER,
            delta,
            total
        });
    };
    // 播放
    play = () => {
        this.dispatchEvent({
            type: RENDERERMANAGER.PLAY
        });
        const playFun = () => {
            this.render();
            this.animationFrame = requestAnimationFrame(playFun);
        };
        playFun();
    };
    // 停止渲染
    stop = () => {
        cancelAnimationFrame(this.animationFrame);
        this.animationFrame = -1;
        this.dispatchEvent({
            type: RENDERERMANAGER.STOP
        });
    };
    // 是否处于渲染当中
    checkHasRendering = () => {
        return this.animationFrame !== -1;
    };
    // 是否有效渲染队列
    hasVaildRender = () => {
        return this.useful();
    };
}
//# sourceMappingURL=RenderManager.js.map