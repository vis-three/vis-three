export const config = {
    name: "openWindow",
    params: {
        url: "",
    },
};
export const generator = function (engine, config) {
    return () => {
        window.open(config.params.url);
    };
};
//# sourceMappingURL=openWindow.js.map