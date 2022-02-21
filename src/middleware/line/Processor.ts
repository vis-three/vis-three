import { LineAllType } from "./LineConfig";

export interface Processor {
  add (config: LineAllType)
  set ()
}