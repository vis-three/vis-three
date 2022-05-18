export const config = {
    name: "linearTime",
    multiply: 1,
};
export const generator = function (engine, target, attribute, config) {
    if (target[attribute] === undefined) {
        console.error(`object not exist attribute: ${attribute}`, target);
        return (event) => { };
    }
    if (typeof target[attribute] !== "number") {
        console.error(`object attribute is not typeof number.`, target, attribute);
        return (event) => { };
    }
    return (event) => {
        target[attribute] += event.delta * config.multiply;
    };
};
//# sourceMappingURL=linearTime.js.map