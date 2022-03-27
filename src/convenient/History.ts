export interface Action {
  next: () => void
  prev: () => void
}


export class History {
  private actionList: Action[] = []
  private index = -1
  private step = 50

  constructor (step?: number) {
    this.step = step || 50
  }

  private do (command: 'next' | 'prev') {
    this.actionList[this.index][command]();
  }

  apply (action: Action, exec: boolean = false) {
    const actionList = this.actionList
    // 动作超过50情空前面缓存
    if (
      this.index === actionList.length - 1 &&
      actionList.length >= this.step
    ) {
      actionList.shift();
      this.index = this.actionList.length - 1;
      // 如果是在中途添加动作的，后面的全部取消
    } else if (this.index !== -1) {
      // 手动清除动作中的缓存
      actionList.splice(this.index + 1, actionList.length - 1);
    } else if (this.index === -1) {
      this.actionList = [];
    }

    this.actionList.push(action);

    if (exec) {
      this.redo()
    } else {
      this.index += 1;
    }
  }

  redo() {
    this.index += 1;
    if (this.index > this.actionList.length - 1) {
      this.index = this.actionList.length - 1;
      return;
    }
    this.do("next");
  }

  undo() {
    if (this.index < 0) {
      return;
    }
    this.do("prev");
    this.index -= 1;
  }

  clear() {
    this.actionList = [];
  }
}