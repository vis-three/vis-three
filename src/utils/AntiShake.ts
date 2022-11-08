export class AntiShake {
  private list: Array<any> = [];
  private timer?: NodeJS.Timeout;

  time = 0;

  exec(fun: (finish: boolean) => boolean) {
    if (fun(false)) {
      return;
    }

    if (!this.list.includes(fun)) {
      this.list.push(fun);
    }

    this.timer && clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      for (const fun of this.list) {
        fun(true);
      }
      this.list = [];
    }, this.time);
  }

  append(fun: (finish: boolean) => boolean) {
    if (this.list.length && !this.list.includes(fun)) {
      this.list.push(fun);
    } else {
      this.exec(fun);
    }
  }
}

export const antiShake = new AntiShake();
