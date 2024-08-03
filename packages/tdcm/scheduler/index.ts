export class Scheduler {
  private static list: Array<Function> = [];
  private static timer?: number;

  static time = 0;

  static exec(fun: (finish: boolean) => boolean) {
    if (fun(false)) {
      return;
    }

    if (!Scheduler.list.includes(fun)) {
      Scheduler.list.push(fun);
    }

    let cacheCount = 0;

    const autoSequential = () => {
      Scheduler.timer && clearTimeout(Scheduler.timer);
      Scheduler.timer = window.setTimeout(() => {
        const nextList: Array<Function> = [];
        for (const fun of Scheduler.list) {
          if (!fun(false)) {
            nextList.push(fun);
          }
        }

        if (nextList.length) {
          if (nextList.length === cacheCount) {
            for (const fun of nextList) {
              fun(true);
            }
            Scheduler.list = [];
          } else {
            cacheCount = nextList.length;
            Scheduler.list = nextList;
            autoSequential();
          }
        } else {
          Scheduler.list = [];
        }
      }, Scheduler.time);
    };

    autoSequential();
  }

  static append(fun: (finish: boolean) => boolean) {
    if (Scheduler.list.length && !Scheduler.list.includes(fun)) {
      Scheduler.list.push(fun);
    } else {
      Scheduler.exec(fun);
    }
  }

  static nextTick(fun: () => boolean) {
    window.setTimeout(() => {
      fun();
    }, Scheduler.time);
  }
}
