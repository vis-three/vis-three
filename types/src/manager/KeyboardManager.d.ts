import { EventDispatcher } from "../core/EventDispatcher";
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
    register(entity: KeyboardEntity): this;
    update(entity: KeyboardEntity): this;
    cancel(keyArray: string[]): this;
    checkRepeat(keyArray: string[]): boolean;
}
