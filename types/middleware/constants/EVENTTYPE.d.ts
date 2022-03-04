export declare enum RENDERERMANAGER {
    RENDER = "render",
    PLAY = "play",
    STOP = "stop"
}
export declare enum SCENESTATUSMANAGER {
    HOVERCHANGE = "hover-change",
    ACTIVECHANGE = "active-change"
}
export declare enum POINTERMANAGER {
    POINTERDOWN = "pointerdown",
    POINTERMOVE = "pointermove",
    POINTERUP = "pointerup"
}
export declare enum MODELCOMPILER {
    SETMATERIAL = "setMaterial"
}
export declare const EVENTTYPE: {
    RENDERERMANAGER: typeof RENDERERMANAGER;
    SCENESTATUSMANAGER: typeof SCENESTATUSMANAGER;
    POINTERMANAGER: typeof POINTERMANAGER;
    MODELCOMPILER: typeof MODELCOMPILER;
};
