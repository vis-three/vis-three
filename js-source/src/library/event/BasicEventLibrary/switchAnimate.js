export const config = {
    name: "switchAnimate",
    params: {
        target: "",
        toggle: "auto",
        delay: 0,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const target = engine.getConfigBySymbol(params.target);
    if (!target) {
        console.warn(`basic event switchAnimate: can not found vid config: ${params.target}`);
        return () => { };
    }
    return () => {
        setTimeout(() => {
            if (params.toggle === "auto") {
                target.play != target.play;
                return;
            }
            if (params.toggle === "off") {
                target.play = false;
                return;
            }
            if (params.toggle === "on") {
                target.play = true;
                return;
            }
        }, params.delay);
    };
};
//# sourceMappingURL=switchAnimate.js.map