import { EventDispatcher } from "@vis-three/core";
import { Clock } from "three";
export var RENDER_EVENT;
(function (RENDER_EVENT) {
    RENDER_EVENT["RENDER"] = "render";
    RENDER_EVENT["PLAY"] = "play";
    RENDER_EVENT["STOP"] = "stop";
})(RENDER_EVENT || (RENDER_EVENT = {}));
export class RenderManager extends EventDispatcher {
    clock = new Clock(); // 引擎时钟
    animationFrame = -1; // 渲染定时器
    fps = 0; // 帧率 0 跟随系统
    timer = null;
    playFun = () => { };
    constructor(fps = 0) {
        super();
        this.setFPS(fps);
    }
    /**
     * 设置fps
     * @param fps 帧率
     * @returns
     */
    setFPS(fps) {
        if (this.animationFrame !== -1) {
            cancelAnimationFrame(this.animationFrame);
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.fps = fps;
        if (fps <= 0) {
            this.fps = 0;
            this.playFun = () => {
                this.render();
                this.animationFrame = requestAnimationFrame(this.playFun);
            };
        }
        else {
            this.playFun = () => {
                this.timer = setTimeout(() => {
                    this.playFun();
                }, fps);
                this.render();
            };
        }
        this.playFun();
        return this;
    }
    /**
     * 渲染一帧
     */
    render = () => {
        this.dispatchEvent({
            type: RENDER_EVENT.RENDER,
            delta: this.clock.getDelta(),
            total: this.clock.getElapsedTime(),
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
            type: RENDER_EVENT.RENDER,
        });
        this.playFun();
    };
    /**
     * 停止渲染
     */
    stop = () => {
        if (this.animationFrame !== -1) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = -1;
        }
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
        this.dispatchEvent({
            type: RENDER_EVENT.STOP,
        });
    };
    /**
     * 是否处于渲染当中
     * @returns boolean
     */
    hasRendering = () => {
        return Boolean(this.animationFrame !== -1 || this.timer);
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
