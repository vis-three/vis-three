import { SymbolConfig } from "../common/CommonConfig";
import { CONFIGTYPE } from "../constants/configType";
import { BasicEventConfig } from "./EventCompiler";

export interface EventConfig extends SymbolConfig {
  target: string;
  pointerdown: BasicEventConfig[];
  pointermove: BasicEventConfig[];
  pointerup: BasicEventConfig[];
  pointerenter: BasicEventConfig[];
  pointerleave: BasicEventConfig[];
  click: BasicEventConfig[];
  dblclick: BasicEventConfig[];
  contextmenu: BasicEventConfig[];
}

export const getEventConfig = function (): EventConfig {
  return {
    vid: "",
    type: CONFIGTYPE.EVENT,
    target: "",
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
