import { CompilerManager } from "../manager/CompilerManager";
export const CompilerManagerPlugin = function (params) {
    if (this.compilerManager) {
        console.warn('engine has installed compilerManager plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.warn(`must install webGLRenderer before compilerManager plugin.`);
        return false;
    }
    if (!this.scene) {
        console.warn(`must install scene before compilerManager plugin.`);
        return false;
    }
    if (!this.renderManager) {
        console.warn(`must install renderManager before compilerManager plugin.`);
        return false;
    }
    if (!this.dataSupportManager) {
        console.warn('must install dataSupportManager before compilerManager plugin.');
        return false;
    }
    const compilerManager = new CompilerManager().support(this);
    this.compilerManager = compilerManager;
    // 有事件管理器，装饰所有物体编译器的add,remove，监听增加相关事件
    if (this.eventManager) {
        const objectCompilerList = compilerManager.getObjectCompilerList();
    }
    return true;
};
//# sourceMappingURL=CompilerManagerPlugin.js.map