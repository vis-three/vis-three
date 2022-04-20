export const PassRule = function (input, compiler) {
    const { operate, key, value } = input;
    if (operate === "add") {
        compiler.add(value);
        return;
    }
    if (operate === "delete") {
        compiler.remove(value.vid);
    }
};
//# sourceMappingURL=PassRule.js.map