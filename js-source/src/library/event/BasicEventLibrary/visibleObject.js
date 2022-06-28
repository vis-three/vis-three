export const config = {
    name: "visibleObject",
    params: {
        target: "",
        visible: true,
        delay: 0,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const target = engine.getObjectBySymbol(params.target);
    if (!target) {
        console.warn(`basic event visibleObject: can not found vid object: ${params.target}`);
        return () => { };
    }
    return () => {
        setTimeout(() => {
            target.visible = params.visible;
        }, params.delay);
    };
};
//# sourceMappingURL=visibleObject.js.map