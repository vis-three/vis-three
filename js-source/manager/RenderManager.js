import { EventDispatcher, Clock, } from "three";
export class RenderManager extends EventDispatcher {
    clock = new Clock(); // 引擎时钟
    animationFrame = -1; // 渲染定时器
    // 渲染
    render = () => {
        const clock = this.clock;
        const delta = clock.getDelta();
        const total = clock.getElapsedTime();
        this.dispatchEvent({
            type: 'render',
            delta,
            total
        });
    };
    // 播放
    play = () => {
        this.dispatchEvent({
            type: 'play'
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
            type: 'stop'
        });
    };
    // 是否处于渲染当中
    checkHasRendering = () => {
        return this.animationFrame !== -1;
    };
    // 是否有效渲染队列
    hasVaildRender = () => {
        // @ts-ignore
        if (!this._listeners) {
            return false;
        }
        // @ts-ignore
        const listener = this._listeners['render'];
        return listener && listener.length;
    };
}
//# sourceMappingURL=RenderManager.js.map