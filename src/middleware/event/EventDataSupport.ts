import { DataSupport } from "../../core/DataSupport";
import { EventCompiler, EventCompilerTarget } from "./EventCompiler";
import { EventRule } from "./EventRule";

export class EventDataSupport extends DataSupport<EventCompilerTarget, EventCompiler> {
  constructor (data?: EventCompilerTarget) {
    !data && (data = {})
    super(EventRule, data)
  }
}