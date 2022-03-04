import { CONFIGTYPE } from "../constants/configType";
export const getEventConfig = function () {
    return {
        vid: '',
        type: CONFIGTYPE.EVENT,
        target: '',
        pointerdown: [],
        pointermove: [],
        pointerup: [],
        pointerenter: [],
        pointerleave: [],
        click: [],
        dblclick: [],
        contextmenu: []
    };
};
//# sourceMappingURL=eventConfig.js.map