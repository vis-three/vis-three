import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
export const config = {
    name: "addClass",
    params: {
        target: "",
        className: "",
        delay: 0,
    },
};
export const generator = function (engine, config) {
    const params = config.params;
    const targets = [];
    if (params.target === "all") {
        engine.scene.traverse((object) => {
            if (object instanceof CSS3DObject) {
                targets.push(object);
            }
        });
    }
    else if (Array.isArray(params.target)) {
        params.target.forEach((symbol) => {
            const target = engine.getObjectBySymbol(symbol);
            if (!target) {
                console.warn(`basic event AddClass: can not found vid object: ${params.target}`);
            }
            else {
                targets.push(target);
            }
        });
    }
    else {
        const target = engine.getObjectBySymbol(params.target);
        if (!target) {
            console.warn(`basic event AddClass: can not found vid object: ${params.target}`);
            return () => { };
        }
        if (!(target instanceof CSS3DObject)) {
            console.warn(`basic event AddClass: object is not a CSS3DObject.`);
            return () => { };
        }
        targets.push(target);
    }
    if (!targets.length) {
        console.warn(`basic event AddClass: can not found vid object: ${params.target}`);
        return () => { };
    }
    return () => {
        setTimeout(() => {
            targets.forEach((target) => {
                target.element.classList.add(params.className);
            });
        }, params.delay);
    };
};
//# sourceMappingURL=addClass.js.map