import { EventDispatcher } from "@vis-three/core/eventDispatcher";
import { KeyEvent } from "keyboardjs";
export interface KeyboardEntity {
    shortcutKey: string[];
    desp: string;
    keydown?: (event?: KeyEvent) => void;
    keyup?: (event?: KeyEvent) => void;
}
export declare class KeyboardManager extends EventDispatcher {
    private map;
    constructor();
    private generateSymbol;
    /**
     * 限定捷键监听dom- 默认document
     * @param dom
     * @returns this
     */
    watch(dom: HTMLElement | undefined): this;
    /**
     * 注册快捷键
     * @param entity
     * @returns
     */
    register(entity: KeyboardEntity): this;
    /**
     * 更新快捷键
     * @param entity
     * @returns
     */
    update(entity: KeyboardEntity): this;
    /**
     * 注销快捷键
     * @param keyArray 快捷键组合
     * @returns this
     */
    cancel(keyArray: string[]): this;
    /**
     * 检查有无重复键
     * @param keyArray 快捷键组合
     * @returns boolean
     */
    checkRepeat(keyArray: string[]): boolean;
    /**
     * 获取快捷键文档
     */
    getDocs(): Array<Pick<KeyboardEntity, "shortcutKey" | "desp">>;
}
