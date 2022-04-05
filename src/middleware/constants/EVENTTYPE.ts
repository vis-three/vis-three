// 所有的事件类型枚举

export enum RENDERERMANAGER {
  RENDER = "render",
  PLAY = "play",
  STOP = "stop",
}

export enum SCENESTATUSMANAGER {
  HOVERCHANGE = "hover-change",
  ACTIVECHANGE = "active-change",
}

export enum POINTERMANAGER {
  POINTERDOWN = "pointerdown",
  POINTERMOVE = "pointermove",
  POINTERUP = "pointerup",
}

export enum MODELCOMPILER {
  SETMATERIAL = "setMaterial",
}

export const EVENTTYPE = {
  RENDERERMANAGER,
  SCENESTATUSMANAGER,
  POINTERMANAGER,
  MODELCOMPILER,
};
