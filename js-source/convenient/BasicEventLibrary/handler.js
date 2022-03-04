export const openWindow = function (compiler, config) {
    return () => {
        window.open(config.params.url);
    };
};
//# sourceMappingURL=handler.js.map