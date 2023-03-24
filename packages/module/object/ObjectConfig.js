export const getObjectConfig = () => {
    return {
        vid: "",
        name: "",
        type: "Object3D",
        castShadow: true,
        receiveShadow: true,
        lookAt: "",
        visible: true,
        matrixAutoUpdate: true,
        renderOrder: 0,
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0,
        },
        scale: {
            x: 1,
            y: 1,
            z: 1,
        },
        up: {
            x: 0,
            y: 1,
            z: 0,
        },
        parent: "",
        children: [],
        pointerdown: [],
        pointermove: [],
        pointerup: [],
        pointerenter: [],
        pointerleave: [],
        click: [],
        dblclick: [],
        contextmenu: [],
    };
};
