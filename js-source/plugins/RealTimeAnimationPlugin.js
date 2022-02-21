export const RealTimeAnimationPlugin = function (params) {
    if (this.pointerManager) {
        console.warn('this has installed pointerManager plugin.');
        return false;
    }
    if (!this.webGLRenderer) {
        console.error('must install some renderer before this plugin.');
        return false;
    }
    return true;
};
//# sourceMappingURL=RealTimeAnimationPlugin.js.map