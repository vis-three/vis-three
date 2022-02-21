import { LineAllType } from "./LineConfig";
export interface Processor {
    add(config: LineAllType): any;
    set(): any;
}
