export class AntiShake {
    list = [];
    timer;
    time = 0;
    exec(fun) {
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
    append(fun) {
        if (this.list.length && !this.list.includes(fun)) {
            this.list.push(fun);
        }
        else {
            this.exec(fun);
        }
    }
    nextTick(fun) {
        setTimeout(() => {
            fun();
        }, this.time);
    }
}
export const globalAntiShake = new AntiShake();
