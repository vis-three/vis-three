export class TransformAction {
    transfromControls;
    nextState = {
        mode: 'translate',
        space: 'world',
        tranform: '',
        objectMap: new Map()
    };
    prevState = {
        mode: 'translate',
        space: 'world',
        tranform: '',
        objectMap: new Map()
    };
    constructor(params) {
        this.transfromControls = params.transformControls;
    }
    generate(status) {
        const transformControls = this.transfromControls;
        const mode = transformControls.mode;
        const tranform = mode === 'rotate' ? 'rotation' : mode === 'translate' ? 'position' : mode;
        const objectSet = transformControls.getTransObjectSet();
        const state = this[`${status}State`];
        state.mode = mode;
        state.tranform = tranform;
        state.space = transformControls.space;
        const cacheMap = state.objectMap;
        objectSet.forEach(object => {
            cacheMap.set(object, {
                x: object[tranform].x,
                y: object[tranform].y,
                z: object[tranform].z
            });
        });
        this[status] = function () {
            const transformControls = this.transfromControls;
            const state = this[`${status}State`];
            transformControls.mode = state.mode;
            transformControls.space = state.space;
            const tranform = state.tranform;
            const objects = [];
            state.objectMap.forEach((vector3, object) => {
                object[tranform].x = vector3.x;
                object[tranform].y = vector3.y;
                object[tranform].z = vector3.z;
                objects.push(object);
            });
            transformControls.setAttach(...objects);
        };
    }
    next() { }
    prev() { }
}
//# sourceMappingURL=TransformAction.js.map