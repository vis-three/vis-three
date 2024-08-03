export class AntiShake {
  private list: Array<Function> = [];
  private timer?: NodeJS.Timeout;

  time = 0;

  exec(fun: (finish: boolean) => boolean) {
    if (fun(false)) {
      return;
    }

    if (!this.list.includes(fun)) {
      this.list.push(fun);
    }

    let cacheCount = 0;

    const autoSequential = () => {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const nextList: Array<Function> = [];
        for (const fun of this.list) {
          if (!fun(false)) {
            nextList.push(fun);
          }
        }

        if (nextList.length) {
          if (nextList.length === cacheCount) {
            for (const fun of nextList) {
              fun(true);
            }
            this.list = [];
          } else {
            cacheCount = nextList.length;
            this.list = nextList;
            autoSequential();
          }
        } else {
          this.list = [];
        }
      }, this.time);
    };

    autoSequential();
  }

  append(fun: (finish: boolean) => boolean) {
    if (this.list.length && !this.list.includes(fun)) {
      this.list.push(fun);
    } else {
      this.exec(fun);
    }
  }

  nextTick(fun: () => boolean) {
    setTimeout(() => {
      fun();
    }, this.time);
  }
}

/**
 * @deprecated use Scheduler
 */
export const globalAntiShake = new AntiShake();
