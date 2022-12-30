export const config = {
    name: "changeCamera",
    params: {
        camera: "",
        delay: 0,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    return () => {
        setTimeout(() => {
            engine.setCameraBySymbol(params.camera);
        }, params.delay);
    };
};
