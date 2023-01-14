export const config = {
    name: "sinWave",
    wavelength: 1,
    offset: 0,
    amplitude: 1,
    speed: 1,
};
export const generator = function (engine, target, attribute, config) {
    if (target[attribute] === undefined) {
        console.warn(`object not exist attribute: ${attribute}`, target);
        return (event) => { };
    }
    if (typeof target[attribute] !== "number") {
        console.warn(`object attribute is not typeof number.`, target, attribute);
        return (event) => { };
    }
    const origin = target[attribute];
    return (event) => {
        target[attribute] =
            origin +
                config.amplitude *
                    Math.sin((event.total * config.speed) / config.wavelength) +
                config.offset;
    };
};
