export class Translater {
    rule;
    memberSet;
    constructor() {
        this.rule = function () { };
        this.memberSet = new Set();
    }
    apply(compiler) {
        this.memberSet.add(compiler);
        return this;
    }
    cancel(compiler) {
        this.memberSet.delete(compiler);
        return this;
    }
    setRule(rule) {
        this.rule = rule;
        return this;
    }
    translate(notice) {
        const rule = this.rule;
        this.memberSet.forEach(compiler => {
            rule(notice, compiler);
        });
        return this;
    }
}
//# sourceMappingURL=Translater.js.map