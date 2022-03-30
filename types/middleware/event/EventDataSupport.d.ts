import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { EventCompiler, EventCompilerTarget } from "./EventCompiler";
export declare class EventDataSupport extends DataSupport<EventCompilerTarget, EventCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: EventCompilerTarget);
}
