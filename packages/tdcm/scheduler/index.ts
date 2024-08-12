export class AsyncScheduler {
  private static list: Array<Function> = [];
  private static timer?: number;

  static time = 0;

  static exec(fun: (finish: boolean) => boolean) {
    if (fun(false)) {
      return;
    }

    if (!AsyncScheduler.list.includes(fun)) {
      AsyncScheduler.list.push(fun);
    }

    let cacheCount = 0;

    const autoSequential = () => {
      AsyncScheduler.timer && clearTimeout(AsyncScheduler.timer);
      AsyncScheduler.timer = window.setTimeout(() => {
        const nextList: Array<Function> = [];
        for (const fun of AsyncScheduler.list) {
          if (!fun(false)) {
            nextList.push(fun);
          }
        }

        if (nextList.length) {
          if (nextList.length === cacheCount) {
            for (const fun of nextList) {
              fun(true);
            }
            AsyncScheduler.list = [];
          } else {
            cacheCount = nextList.length;
            AsyncScheduler.list = nextList;
            autoSequential();
          }
        } else {
          AsyncScheduler.list = [];
        }
      }, AsyncScheduler.time);
    };

    autoSequential();
  }

  static append(fun: (finish: boolean) => boolean) {
    if (AsyncScheduler.list.length && !AsyncScheduler.list.includes(fun)) {
      AsyncScheduler.list.push(fun);
    } else {
      AsyncScheduler.exec(fun);
    }
  }

  static nextTick(fun: () => boolean) {
    window.setTimeout(() => {
      fun();
    }, AsyncScheduler.time);
  }
}
