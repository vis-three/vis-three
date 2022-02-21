import { SymbolConfig } from "../common/CommonConfig";

export interface EventConfig extends SymbolConfig {
  pointerdown: string[]
  pointermove: string[]
  pointerup: string[]
  pointerenter: string[]
  pointerleave: string[]
  click: string[]
}

export const getEventConfig = function (): EventConfig {
  return {
    vid: '',
    type: 'Event',
    pointerdown: [],
    pointermove: [],
    pointerup: [],
    pointerenter: [],
    pointerleave: [],
    click: []
  }
}