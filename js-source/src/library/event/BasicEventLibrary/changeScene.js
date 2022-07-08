export const config = {
    name: "changeScene",
    params: {
        scene: "Scene",
        delay: 0,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    return () => {
        setTimeout(() => {
            engine.setScene(params.scene);
        }, params.delay);
    };
};
//# sourceMappingURL=changeScene.js.map