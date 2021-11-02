// 历史的动作接口
export interface HistoryAction {
  name: string
  next: Function
  prev: Function
}


export class History {
  private actionList: Array<HistoryAction>
  private index : number
  private maxStep: number

  constructor () {
    this.actionList = []
    this.index = -1
    this.maxStep = 50
  }

  // 添加动作
  addAction (fun: HistoryAction): this {
    // 如果当下的指针不在动作队列的末尾，说明是中途添加，所以要在添加前把指针后的动作清除
    const actionList = this.actionList
    if (this.index < this.actionList.length - 1) {
      actionList.splice(this.index + 1, actionList.length - 1)

    // 如果当前的队列已经超过最大步数先弹出第一个动作
    } else if (actionList.length >= this.maxStep) {
      actionList.shift()
    }

    actionList.push(fun)
    return this
  }

  // 执行动作
  redo (): this {
    this.actionList[this.index].next()
    this.index += 1
    if (this.index > this.actionList.length) {
      this.index = this.actionList.length
    }
    return this
  }

  // 撤销动作
  undo (): this {
    this.actionList[this.index].prev()
    this.index -= 1
    if (this.index < 0) {
      this.index = 0
    }
    return this
  }
}