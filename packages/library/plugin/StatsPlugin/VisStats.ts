import Stats from "three/examples/jsm/libs/stats.module.js";

export interface VisStatsParameters {
  /**监视器模式 */
  mode: number;
  /**顶部距离 */
  top: number;
  /**左边距离 */
  left: number;
  /**底部距离 */
  bottom: number;
  /**右边距离 */
  right: number;
}

export class VisStats implements Stats {
  REVISION: number;
  dom: HTMLDivElement;
  addPanel: (panel: Stats.Panel) => Stats.Panel;
  showPanel: (id: number) => void;
  begin: () => void;
  end: () => number;
  update: () => void;
  domElement: HTMLDivElement;
  /**
   * @deprecated
   */
  setMode: (id: number) => void;

  constructor(parameters?: VisStatsParameters) {
    const stats = new Stats();
    this.REVISION = stats.REVISION;
    this.dom = stats.dom;
    this.domElement = stats.dom;
    this.begin = stats.begin.bind(stats);
    this.end = stats.end.bind(stats);
    this.update = stats.update.bind(stats);
    this.addPanel = stats.addPanel.bind(stats);
    this.showPanel = stats.showPanel.bind(stats);
    this.setMode = () => {};

    const dom = this.domElement;

    dom.style.position = "absolute";
    dom.style.top = "0";
    dom.style.left = "35px";

    if (parameters) {
      dom.style.top = `${parameters.top}px`;
      dom.style.left = `${parameters.left}px`;
      dom.style.right = `${parameters.right}px`;
      dom.style.bottom = `${parameters.bottom}px`;
    }
  }
}
