import keyboardjs from "keyboardjs";
export interface ShortcutKeyParams {
    desp: string;
    keyCombine: string[];
    downFun: keyboardjs.Callback;
    upFun: keyboardjs.Callback;
    preventRepeatByDefault?: boolean;
}
export declare class ShortcutKeyManager {
    private shortcutKeyMap;
    constructor();
    apply(params: ShortcutKeyParams): this;
    replace(params: ShortcutKeyParams): this;
}
//# sourceMappingURL=ShortcutKeyManager.d.ts.map