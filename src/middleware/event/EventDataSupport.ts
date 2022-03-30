import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { EventCompiler, EventCompilerTarget } from "./EventCompiler";
import { EventRule } from "./EventRule";

export class EventDataSupport extends DataSupport<EventCompilerTarget, EventCompiler> {

  MODULE: MODULETYPE = MODULETYPE.EVENT

  constructor (data?: EventCompilerTarget) {
    !data && (data = {})
    super(EventRule, data)
  }
}