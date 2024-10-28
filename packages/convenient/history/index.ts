export class Action {
  /**
   * 该动作的下一步方法
   */
  next() {
    console.warn(
      `this action can not set next function: ${this.constructor.name}`
    );
  }

  /**
   * 该动作的上一步方法
   */
  prev() {
    console.warn(
      `this action can not set prev function: ${this.constructor.name}`
    );
  }
}

export class History {
  private actionList: Action[] = [];
  private index = -1;
  private step = 50;

  constructor(step?: number) {
    this.step = step || 50;
  }

  private do(command: "next" | "prev") {
    this.actionList[this.index][command]();
  }

  /**
   * 注册动作
   * @param action new class extends BasicAction
   * @param exec 是否立即执行动作的next
   */
  apply(action: Action, exec = false) {
    const actionList = this.actionList;
    // 动作超过step情空前面缓存
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
      this.redo();
    } else {
      this.index += 1;
    }
  }

  /**
   * 恢复动作，执行当前动作的next
   * @returns
   */
  redo() {
    this.index += 1;
    if (this.index > this.actionList.length - 1) {
      this.index = this.actionList.length - 1;
      return;
    }
    this.do("next");
  }

  /**
   * 撤销动作，执行当前动作的prev
   * @returns
   */
  undo() {
    if (this.index < 0) {
      return;
    }
    this.do("prev");
    this.index -= 1;
  }

  /**
   * 清空整个历史动作缓存
   */
  clear() {
    this.actionList = [];
  }
}
