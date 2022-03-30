import { VisStats } from '../optimize/VisStats';
export const StatsPlugin = function (params) {
    if (this.stats) {
        console.warn('this has installed stats plugin.');
        return false;
    }
    if (!this.renderManager) {
        console.warn('this must install renderManager before install stats plugin.');
        return false;
    }
    const stats = new VisStats(params);
    this.stats = stats;
    const statsUpdateFun = () => {
        this.stats.update();
    };
    this.setStats = function (show) {
        if (show) {
            this.dom.appendChild(this.stats.domElement);
            this.renderManager.addEventListener('render', statsUpdateFun);
        }
        else {
            try {
                this.dom.removeChild(this.stats.domElement);
                this.renderManager.removeEventListener('render', statsUpdateFun);
            }
            catch (error) {
            }
        }
        return this;
    };
    return true;
};
//# sourceMappingURL=StatsPlugin.js.map