import { KeyboardManager } from "../manager/KeyboardManager";
import { CONFIGTYPE } from "../middleware/constants/configType";
export const KeyboardManagerPlugin = function (params) {
    if (this.keyboardManager) {
        console.warn('engine has installed keyboardManager plugin.');
        return false;
    }
    const keyboardManager = new KeyboardManager();
    this.keyboardManager = keyboardManager;
    this.completeSet.add(() => {
        if (this.transformControls) {
            if (this.IS_ENGINESUPPORT) {
                const transformControls = this.dataSupportManager.controlsDataSupport.getData()[CONFIGTYPE.TRNASFORMCONTROLS];
                keyboardManager.register({
                    shortcutKey: ['r'],
                    desp: 'tranformControls rotate mode',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.mode = 'rotate';
                    }
                }).register({
                    shortcutKey: ['t'],
                    desp: 'tranformControls translate mode',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.mode = 'translate';
                    }
                }).register({
                    shortcutKey: ['e'],
                    desp: 'tranformControls scale mode',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.mode = 'scale';
                    }
                }).register({
                    shortcutKey: ['x'],
                    desp: 'tranformControls switch x axis',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.showX = !transformControls.showX;
                    }
                }).register({
                    shortcutKey: ['y'],
                    desp: 'tranformControls switch y axis',
                    keyup: (event) => {
                        event?.preventDefault();
                        if (event?.ctrlKey) {
                            return;
                        }
                        transformControls.showY = !transformControls.showY;
                    }
                }).register({
                    shortcutKey: ['z'],
                    desp: 'tranformControls switch z axis',
                    keyup: (event) => {
                        event?.preventDefault();
                        if (event?.ctrlKey) {
                            return;
                        }
                        transformControls.showZ = !transformControls.showZ;
                    }
                }).register({
                    shortcutKey: ['space'],
                    desp: 'tranformControls switch coordinate space',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.space = transformControls.space === 'local' ? 'world' : 'local';
                    }
                }).register({
                    shortcutKey: ['shift'],
                    desp: 'tranformControls switch tranform numeric value',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.snapAllow = false;
                    },
                    keydown: (event) => {
                        event?.preventDefault();
                        event?.preventRepeat();
                        transformControls.snapAllow = true;
                    }
                });
            }
            else {
                const transformControls = this.transformControls;
                keyboardManager.register({
                    shortcutKey: ['r'],
                    desp: 'tranformControls rotate mode',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.mode = 'rotate';
                    }
                }).register({
                    shortcutKey: ['t'],
                    desp: 'tranformControls translate mode',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.mode = 'translate';
                    }
                }).register({
                    shortcutKey: ['e'],
                    desp: 'tranformControls scale mode',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.mode = 'scale';
                    }
                }).register({
                    shortcutKey: ['x'],
                    desp: 'tranformControls switch x axis',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.showX = !transformControls.showX;
                    }
                }).register({
                    shortcutKey: ['y'],
                    desp: 'tranformControls switch y axis',
                    keyup: (event) => {
                        event?.preventDefault();
                        if (event?.ctrlKey) {
                            return;
                        }
                        transformControls.showY = !transformControls.showY;
                    }
                }).register({
                    shortcutKey: ['z'],
                    desp: 'tranformControls switch z axis',
                    keyup: (event) => {
                        event?.preventDefault();
                        if (event?.ctrlKey) {
                            return;
                        }
                        transformControls.showZ = !transformControls.showZ;
                    }
                }).register({
                    shortcutKey: ['space'],
                    desp: 'tranformControls switch coordinate space',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.space = transformControls.space === 'local' ? 'world' : 'local';
                    }
                }).register({
                    shortcutKey: ['shift'],
                    desp: 'tranformControls switch tranform numeric value',
                    keyup: (event) => {
                        event?.preventDefault();
                        transformControls.translationSnap = null;
                        transformControls.rotationSnap = null;
                        // @ts-ignore types 没写 源码有这个属性
                        transformControls.scaleSnap = null;
                    },
                    keydown: (event) => {
                        event?.preventDefault();
                        event?.preventRepeat();
                        transformControls.translationSnap = 5;
                        transformControls.rotationSnap = Math.PI / 180 * 10;
                        // @ts-ignore types 没写 源码有这个属性
                        transformControls.scaleSnap = 0.1;
                    }
                });
            }
        }
    });
    return true;
};
//# sourceMappingURL=KeyboardManagerPlugin.js.map