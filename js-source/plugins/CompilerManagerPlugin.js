import { CompilerManager } from "../manager/CompilerManager";
export const CompilerManagerPlugin = function (params) {
    if (this.compilerManager) {
        console.warn('engine has installed compilerManager plugin.');
        return false;
    }
    const compilerManager = new CompilerManager();
    this.compilerManager = compilerManager;
    this.addEventListener('dispose', () => {
        this.compilerManager.dispose();
    });
    this.completeSet.add(() => {
        if (!this.webGLRenderer) {
            console.warn(`must install webGLRenderer before compilerManager plugin.`);
            return;
        }
        if (!this.scene) {
            console.warn(`must install scene before compilerManager plugin.`);
            return;
        }
        if (!this.renderManager) {
            console.warn(`must install renderManager before compilerManager plugin.`);
            return;
        }
        if (!this.dataSupportManager) {
            console.warn('must install dataSupportManager before compilerManager plugin.');
            return;
        }
        // if (this instanceof EngineSupport) {
        this.compilerManager.support(this);
        // }
        // 有事件管理器，装饰所有物体编译器的add,remove，监听增加相关事件
        // if (this.eventManager) {
        //   const objectCompilerList = compilerManager.getObjectCompilerList()
        //   for (let objectCompiler of objectCompilerList) {
        //     objectCompiler.add = function (vid: string, config: ObjectConfig): BasicObjectCompiler {
        //       return this
        //     }
        //     objectCompiler.remove = function (vid: string): BasicObjectCompiler {
        //       return this
        //     }
        //   }
        // }
    });
    return true;
};
//# sourceMappingURL=CompilerManagerPlugin.js.map